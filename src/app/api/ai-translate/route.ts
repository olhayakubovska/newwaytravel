import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: NextRequest) {
  const { text, from, to } = await req.json()

  if (!text) {
    return NextResponse.json({ error: 'No text' }, { status: 400 })
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `Translate text from ${from} to ${to}. Keep meaning, tone and formatting.`,
      },
      {
        role: 'user',
        content: text,
      },
    ],
  })

  return NextResponse.json({
    translated: completion.choices[0].message.content,
  })
}
