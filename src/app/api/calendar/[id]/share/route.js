import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

// POST /api/calendar/[id]/share - share calendar with a team
export async function POST(req, { params }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { teamId } = await req.json();

  const calendar = await prisma.calendar.findUnique({ where: { id } });
  if (!calendar || calendar.userId !== session.user.id) {
    return NextResponse.json({ error: 'Only the owner can share this calendar' }, { status: 403 });
  }

  // Verify user owns or is member of the team
  const team = await prisma.team.findFirst({
    where: {
      id: teamId,
      OR: [
        { ownerId: session.user.id },
        { members: { some: { userId: session.user.id, role: 'admin' } } },
      ],
    },
  });

  if (!team) return NextResponse.json({ error: 'Team not found or insufficient permissions' }, { status: 404 });

  const updated = await prisma.calendar.update({
    where: { id },
    data: { teamId },
    include: { team: { include: { members: { include: { user: { select: { name: true, email: true } } } } } } },
  });

  return NextResponse.json({ calendar: updated });
}

// DELETE /api/calendar/[id]/share - unshare calendar
export async function DELETE(req, { params }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const calendar = await prisma.calendar.findUnique({ where: { id } });
  if (!calendar || calendar.userId !== session.user.id) {
    return NextResponse.json({ error: 'Only the owner can unshare' }, { status: 403 });
  }

  const updated = await prisma.calendar.update({
    where: { id },
    data: { teamId: null },
  });

  return NextResponse.json({ calendar: updated });
}
