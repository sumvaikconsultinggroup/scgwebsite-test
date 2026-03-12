import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import Anthropic from '@anthropic-ai/sdk';

// POST /api/ai/suggest - get AI content suggestions
export async function POST(req) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'AI suggestions are not configured. Add ANTHROPIC_API_KEY to enable.' }, { status: 503 });
  }

  const { brandName, platform, contentType, theme, description, existingCaption } = await req.json();

  if (!brandName || !platform) {
    return NextResponse.json({ error: 'Brand name and platform are required' }, { status: 400 });
  }

  try {
    const client = new Anthropic({ apiKey });

    const prompt = existingCaption
      ? `Improve this social media caption for ${brandName} on ${platform}:
"${existingCaption}"

Make it more engaging, add relevant emojis, and suggest 5 relevant hashtags.
${theme ? `Content theme: ${theme}` : ''}
${contentType ? `Content type: ${contentType}` : ''}`
      : `Generate a social media post for ${brandName} on ${platform}.
${theme ? `Content theme: ${theme}` : ''}
${contentType ? `Content type: ${contentType}` : ''}
${description ? `Additional context: ${description}` : ''}

Provide:
1. An engaging caption with relevant emojis (2-3 sentences)
2. 5-8 relevant hashtags
3. Best time to post
4. A brief content tip`;

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      system: `You are a social media content strategist. You create engaging, platform-specific content.
Always respond in JSON format with these fields:
- caption: string (the post caption)
- hashtags: string[] (array of hashtags with # prefix)
- bestTime: string (recommended posting time like "9:00 AM")
- tip: string (brief content strategy tip)
- contentType: string (recommended content format like "reel", "carousel", "post")`,
    });

    const responseText = message.content[0]?.text || '';

    // Parse JSON from response
    let suggestion;
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      suggestion = jsonMatch ? JSON.parse(jsonMatch[0]) : { caption: responseText, hashtags: [], bestTime: '12:00 PM', tip: '', contentType: 'post' };
    } catch {
      suggestion = { caption: responseText, hashtags: [], bestTime: '12:00 PM', tip: 'AI response could not be parsed', contentType: 'post' };
    }

    return NextResponse.json({ suggestion });
  } catch (error) {
    console.error('AI suggestion error:', error);
    return NextResponse.json({ error: 'AI suggestion failed. Please try again.' }, { status: 500 });
  }
}
