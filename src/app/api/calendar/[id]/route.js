import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

async function verifyAccess(calendarId, userId) {
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

// GET /api/calendar/[id] - get a single calendar with entries
export async function GET(req, { params }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const cal = await verifyAccess(id, session.user.id);
  if (!cal) {
    return NextResponse.json({ error: 'Calendar not found' }, { status: 404 });
  }

  const calendar = await prisma.calendar.findUnique({
    where: { id },
    include: {
      entries: {
        include: {
          createdBy: { select: { name: true, email: true } },
          comments: {
            include: { user: { select: { name: true, email: true } } },
            orderBy: { createdAt: 'asc' },
          },
        },
        orderBy: [{ day: 'asc' }, { createdAt: 'asc' }],
      },
      user: { select: { name: true, email: true } },
      team: {
        include: {
          members: {
            include: { user: { select: { id: true, name: true, email: true } } },
          },
        },
      },
    },
  });

  return NextResponse.json({ calendar });
}

// PUT /api/calendar/[id] - update calendar settings
export async function PUT(req, { params }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const cal = await verifyAccess(id, session.user.id);
  if (!cal) {
    return NextResponse.json({ error: 'Calendar not found' }, { status: 404 });
  }

  const body = await req.json();
  const { name, brandName, brandColor, brandColor2, logoText, logoUrl, month, year, selectedPlatforms, selectedThemes, isWhitelabel, removeBranding, customDomain } = body;

  // Only owner can change whitelabel settings
  if ((isWhitelabel !== undefined || removeBranding !== undefined || customDomain !== undefined) && cal.userId !== session.user.id) {
    return NextResponse.json({ error: 'Only the owner can change whitelabel settings' }, { status: 403 });
  }

  const calendar = await prisma.calendar.update({
    where: { id },
    data: {
      ...(name !== undefined && { name }),
      ...(brandName !== undefined && { brandName }),
      ...(brandColor !== undefined && { brandColor }),
      ...(brandColor2 !== undefined && { brandColor2 }),
      ...(logoText !== undefined && { logoText }),
      ...(logoUrl !== undefined && { logoUrl }),
      ...(month !== undefined && { month }),
      ...(year !== undefined && { year }),
      ...(selectedPlatforms !== undefined && { selectedPlatforms: JSON.stringify(selectedPlatforms) }),
      ...(selectedThemes !== undefined && { selectedThemes: JSON.stringify(selectedThemes) }),
      ...(isWhitelabel !== undefined && { isWhitelabel }),
      ...(removeBranding !== undefined && { removeBranding }),
      ...(customDomain !== undefined && { customDomain }),
    },
  });

  return NextResponse.json({ calendar });
}

// DELETE /api/calendar/[id]
export async function DELETE(req, { params }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const cal = await prisma.calendar.findUnique({ where: { id } });
  if (!cal || cal.userId !== session.user.id) {
    return NextResponse.json({ error: 'Only the owner can delete a calendar' }, { status: 403 });
  }

  await prisma.calendar.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
