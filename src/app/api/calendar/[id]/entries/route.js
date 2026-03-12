import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

async function verifyCalendarAccess(calendarId, userId) {
  const cal = await prisma.calendar.findUnique({
    where: { id: calendarId },
    include: { team: { include: { members: true } } },
  });
  if (!cal) return null;
  if (cal.userId === userId) return cal;
  if (cal.team?.members.some((m) => m.userId === userId)) return cal;
  if (cal.team?.ownerId === userId) return cal;
  return null;
}

// POST /api/calendar/[id]/entries - create entry
export async function POST(req, { params }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const cal = await verifyCalendarAccess(id, session.user.id);
  if (!cal) return NextResponse.json({ error: 'Calendar not found' }, { status: 404 });

  const body = await req.json();
  const { day, platform, type, caption, hashtags, time, notes, status } = body;

  if (!day || !platform || !type) {
    return NextResponse.json({ error: 'Day, platform, and type are required' }, { status: 400 });
  }

  const entry = await prisma.calendarEntry.create({
    data: {
      calendarId: id,
      day,
      platform,
      type,
      caption: caption || '',
      hashtags: JSON.stringify(hashtags || []),
      time: time || null,
      notes: notes || null,
      status: status || 'draft',
      createdById: session.user.id,
    },
    include: {
      createdBy: { select: { name: true, email: true } },
    },
  });

  return NextResponse.json({ entry }, { status: 201 });
}

// PUT /api/calendar/[id]/entries - bulk create/update entries
export async function PUT(req, { params }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const cal = await verifyCalendarAccess(id, session.user.id);
  if (!cal) return NextResponse.json({ error: 'Calendar not found' }, { status: 404 });

  const { entries } = await req.json();
  if (!Array.isArray(entries)) {
    return NextResponse.json({ error: 'entries must be an array' }, { status: 400 });
  }

  // Delete existing entries and create new ones
  await prisma.calendarEntry.deleteMany({ where: { calendarId: id } });

  const created = await Promise.all(
    entries.map((e) =>
      prisma.calendarEntry.create({
        data: {
          calendarId: id,
          day: e.day,
          platform: e.platform,
          type: e.type,
          caption: e.caption || '',
          hashtags: JSON.stringify(e.hashtags || []),
          time: e.time || null,
          notes: e.notes || null,
          status: e.status || 'draft',
          createdById: session.user.id,
        },
      })
    )
  );

  return NextResponse.json({ entries: created });
}
