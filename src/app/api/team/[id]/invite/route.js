import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

// POST /api/team/[id]/invite - invite a user to a team
export async function POST(req, { params }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { email, role } = await req.json();

  if (!email?.trim()) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

  // Verify the inviter is an admin or owner
  const team = await prisma.team.findUnique({
    where: { id },
    include: { members: true },
  });

  if (!team) return NextResponse.json({ error: 'Team not found' }, { status: 404 });

  const isOwner = team.ownerId === session.user.id;
  const isAdmin = team.members.some((m) => m.userId === session.user.id && m.role === 'admin');
  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: 'Only admins can invite members' }, { status: 403 });
  }

  // Find the user
  const user = await prisma.user.findUnique({ where: { email: email.trim() } });
  if (!user) {
    return NextResponse.json({ error: 'User not found. They need to register first.' }, { status: 404 });
  }

  // Check if already a member
  const existingMember = team.members.find((m) => m.userId === user.id);
  if (existingMember) {
    return NextResponse.json({ error: 'User is already a member of this team' }, { status: 409 });
  }

  const member = await prisma.teamMember.create({
    data: {
      teamId: id,
      userId: user.id,
      role: role || 'editor',
    },
    include: {
      user: { select: { id: true, name: true, email: true } },
    },
  });

  return NextResponse.json({ member }, { status: 201 });
}

// DELETE /api/team/[id]/invite - remove a member
export async function DELETE(req, { params }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

  const team = await prisma.team.findUnique({ where: { id } });
  if (!team) return NextResponse.json({ error: 'Team not found' }, { status: 404 });

  // Owner can remove anyone, members can remove themselves
  if (team.ownerId !== session.user.id && userId !== session.user.id) {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
  }

  // Can't remove the owner
  if (userId === team.ownerId) {
    return NextResponse.json({ error: 'Cannot remove the team owner' }, { status: 400 });
  }

  await prisma.teamMember.delete({
    where: { teamId_userId: { teamId: id, userId } },
  });

  return NextResponse.json({ success: true });
}
