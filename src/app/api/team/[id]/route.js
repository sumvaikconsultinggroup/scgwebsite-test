import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

// DELETE /api/team/[id]
export async function DELETE(req, { params }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const team = await prisma.team.findUnique({ where: { id } });

  if (!team || team.ownerId !== session.user.id) {
    return NextResponse.json({ error: 'Only the owner can delete this team' }, { status: 403 });
  }

  await prisma.team.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
