import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET /api/team - list user's teams
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const teams = await prisma.team.findMany({
    where: {
      OR: [
        { ownerId: session.user.id },
        { members: { some: { userId: session.user.id } } },
      ],
    },
    include: {
      owner: { select: { id: true, name: true, email: true } },
      members: {
        include: { user: { select: { id: true, name: true, email: true } } },
      },
      _count: { select: { calendars: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ teams });
}

// POST /api/team - create a new team
export async function POST(req) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { name } = await req.json();
  if (!name?.trim()) return NextResponse.json({ error: 'Team name is required' }, { status: 400 });

  const team = await prisma.team.create({
    data: {
      name: name.trim(),
      ownerId: session.user.id,
      members: {
        create: { userId: session.user.id, role: 'admin' },
      },
    },
    include: {
      owner: { select: { name: true, email: true } },
      members: { include: { user: { select: { id: true, name: true, email: true } } } },
    },
  });

  return NextResponse.json({ team }, { status: 201 });
}
