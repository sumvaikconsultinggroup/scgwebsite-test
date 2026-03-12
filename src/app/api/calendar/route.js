import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET /api/calendar - list user's calendars
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const calendars = await prisma.calendar.findMany({
    where: {
      OR: [
        { userId: session.user.id },
        { team: { members: { some: { userId: session.user.id } } } },
      ],
    },
    include: {
      user: { select: { name: true, email: true } },
      team: { select: { id: true, name: true } },
      _count: { select: { entries: true } },
    },
    orderBy: { updatedAt: 'desc' },
  });

  return NextResponse.json({ calendars });
}

// POST /api/calendar - create a new calendar
export async function POST(req) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { name, brandName, brandColor, brandColor2, logoText, logoUrl, month, year, selectedPlatforms, selectedThemes, teamId, isWhitelabel, entries } = body;

  if (!brandName || month === undefined || year === undefined) {
    return NextResponse.json({ error: 'Brand name, month, and year are required' }, { status: 400 });
  }

  // Verify team membership if teamId provided
  if (teamId) {
    const membership = await prisma.teamMember.findUnique({
      where: { teamId_userId: { teamId, userId: session.user.id } },
    });
    const isOwner = await prisma.team.findFirst({
      where: { id: teamId, ownerId: session.user.id },
    });
    if (!membership && !isOwner) {
      return NextResponse.json({ error: 'Not a member of this team' }, { status: 403 });
    }
  }

  const calendar = await prisma.calendar.create({
    data: {
      name: name || `${brandName} - ${month + 1}/${year}`,
      brandName,
      brandColor: brandColor || '#00f0ff',
      brandColor2: brandColor2 || '#8b5cf6',
      logoText,
      logoUrl,
      month,
      year,
      selectedPlatforms: JSON.stringify(selectedPlatforms || []),
      selectedThemes: JSON.stringify(selectedThemes || []),
      userId: session.user.id,
      teamId: teamId || null,
      isWhitelabel: isWhitelabel || false,
      entries: entries?.length > 0 ? {
        create: entries.map((e) => ({
          day: e.day,
          platform: e.platform,
          type: e.type,
          caption: e.caption,
          hashtags: JSON.stringify(e.hashtags || []),
          time: e.time || null,
          notes: e.notes || null,
          status: e.status || 'draft',
          createdById: session.user.id,
        })),
      } : undefined,
    },
    include: {
      entries: true,
      _count: { select: { entries: true } },
    },
  });

  return NextResponse.json({ calendar }, { status: 201 });
}
