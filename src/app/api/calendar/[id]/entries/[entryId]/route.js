import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

// PUT /api/calendar/[id]/entries/[entryId]
export async function PUT(req, { params }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, entryId } = await params;

  const entry = await prisma.calendarEntry.findFirst({
    where: { id: entryId, calendarId: id },
    include: { calendar: { include: { team: { include: { members: true } } } } },
  });

  if (!entry) return NextResponse.json({ error: 'Entry not found' }, { status: 404 });

  const cal = entry.calendar;
  const hasAccess = cal.userId === session.user.id ||
    cal.team?.members.some((m) => m.userId === session.user.id) ||
    cal.team?.ownerId === session.user.id;

  if (!hasAccess) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const { day, platform, type, caption, hashtags, time, notes, status } = body;

  const updated = await prisma.calendarEntry.update({
    where: { id: entryId },
    data: {
      ...(day !== undefined && { day }),
      ...(platform !== undefined && { platform }),
      ...(type !== undefined && { type }),
      ...(caption !== undefined && { caption }),
      ...(hashtags !== undefined && { hashtags: JSON.stringify(hashtags) }),
      ...(time !== undefined && { time }),
      ...(notes !== undefined && { notes }),
      ...(status !== undefined && { status }),
    },
  });

  return NextResponse.json({ entry: updated });
}

// DELETE /api/calendar/[id]/entries/[entryId]
export async function DELETE(req, { params }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, entryId } = await params;

  const entry = await prisma.calendarEntry.findFirst({
    where: { id: entryId, calendarId: id },
    include: { calendar: { include: { team: { include: { members: true } } } } },
  });

  if (!entry) return NextResponse.json({ error: 'Entry not found' }, { status: 404 });

  const cal = entry.calendar;
  const hasAccess = cal.userId === session.user.id ||
    cal.team?.members.some((m) => m.userId === session.user.id) ||
    cal.team?.ownerId === session.user.id;

  if (!hasAccess) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  await prisma.calendarEntry.delete({ where: { id: entryId } });
  return NextResponse.json({ success: true });
}
