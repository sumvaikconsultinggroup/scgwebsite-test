import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// GET /api/calendar/[id]/export?format=ics|csv
export async function GET(req, { params }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const format = searchParams.get('format') || 'ics';

  const calendar = await prisma.calendar.findUnique({
    where: { id },
    include: {
      entries: { orderBy: [{ day: 'asc' }, { createdAt: 'asc' }] },
      team: { include: { members: true } },
    },
  });

  if (!calendar) return NextResponse.json({ error: 'Calendar not found' }, { status: 404 });

  const hasAccess = calendar.userId === session.user.id ||
    calendar.team?.members.some((m) => m.userId === session.user.id) ||
    calendar.team?.ownerId === session.user.id;
  if (!hasAccess) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  if (format === 'ics') {
    return generateICS(calendar);
  } else if (format === 'csv') {
    return generateCSV(calendar);
  }

  return NextResponse.json({ error: 'Invalid format. Use ics or csv' }, { status: 400 });
}

function generateICS(calendar) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SCG//Content Calendar//EN',
    'CALSCALE:GREGORIAN',
    `X-WR-CALNAME:${calendar.brandName} Content Calendar`,
  ];

  calendar.entries.forEach((entry) => {
    const hashtags = JSON.parse(entry.hashtags || '[]');
    const dateStr = `${calendar.year}${String(calendar.month + 1).padStart(2, '0')}${String(entry.day).padStart(2, '0')}`;

    let startTime = '090000';
    if (entry.time) {
      const match = entry.time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      if (match) {
        let h = parseInt(match[1]);
        const m = match[2];
        const ap = match[3].toUpperCase();
        if (ap === 'PM' && h !== 12) h += 12;
        if (ap === 'AM' && h === 12) h = 0;
        startTime = `${String(h).padStart(2, '0')}${m}00`;
      }
    }

    lines.push('BEGIN:VEVENT');
    lines.push(`DTSTART:${dateStr}T${startTime}`);
    lines.push(`DTEND:${dateStr}T${startTime}`);
    lines.push(`SUMMARY:[${entry.type.toUpperCase()}] ${entry.platform} - ${entry.caption.slice(0, 50)}`);
    lines.push(`DESCRIPTION:${entry.caption}${hashtags.length > 0 ? '\\n\\nHashtags: ' + hashtags.join(' ') : ''}${entry.notes ? '\\n\\nNotes: ' + entry.notes : ''}`);
    lines.push(`CATEGORIES:${entry.platform},${entry.type}`);
    lines.push(`STATUS:${entry.status === 'published' ? 'COMPLETED' : 'TENTATIVE'}`);
    lines.push(`UID:${entry.id}@scg-calendar`);
    lines.push('END:VEVENT');
  });

  lines.push('END:VCALENDAR');

  return new NextResponse(lines.join('\r\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${calendar.brandName}-${months[calendar.month]}-${calendar.year}.ics"`,
    },
  });
}

function generateCSV(calendar) {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const rows = ['Day,Date,Platform,Content Type,Caption,Hashtags,Time,Notes,Status'];

  calendar.entries.forEach((entry) => {
    const hashtags = JSON.parse(entry.hashtags || '[]');
    const date = new Date(calendar.year, calendar.month, entry.day);
    const dateStr = `${months[calendar.month]} ${entry.day}, ${calendar.year}`;
    const dow = dayNames[date.getDay()];

    rows.push([
      dow,
      dateStr,
      entry.platform,
      entry.type,
      `"${(entry.caption || '').replace(/"/g, '""')}"`,
      hashtags.join(' '),
      entry.time || '',
      `"${(entry.notes || '').replace(/"/g, '""')}"`,
      entry.status,
    ].join(','));
  });

  return new NextResponse(rows.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${calendar.brandName}-${months[calendar.month]}-${calendar.year}.csv"`,
    },
  });
}
