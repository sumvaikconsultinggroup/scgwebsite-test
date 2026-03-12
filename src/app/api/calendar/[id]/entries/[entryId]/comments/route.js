import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

// POST /api/calendar/[id]/entries/[entryId]/comments
export async function POST(req, { params }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, entryId } = await params;
  const { text } = await req.json();

  if (!text?.trim()) {
    return NextResponse.json({ error: 'Comment text is required' }, { status: 400 });
  }

  // Verify access
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

  const comment = await prisma.comment.create({
    data: {
      text: text.trim(),
      entryId,
      userId: session.user.id,
    },
    include: {
      user: { select: { name: true, email: true } },
    },
  });

  return NextResponse.json({ comment }, { status: 201 });
}

// DELETE /api/calendar/[id]/entries/[entryId]/comments
export async function DELETE(req, { params }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const commentId = searchParams.get('commentId');
  if (!commentId) return NextResponse.json({ error: 'commentId required' }, { status: 400 });

  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment || comment.userId !== session.user.id) {
    return NextResponse.json({ error: 'Cannot delete this comment' }, { status: 403 });
  }

  await prisma.comment.delete({ where: { id: commentId } });
  return NextResponse.json({ success: true });
}
