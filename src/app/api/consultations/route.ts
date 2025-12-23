import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config: configPromise })
    const data = await req.json()

    // Создаем запись в коллекции 'consultations'
    const result = await payload.create({
      collection: 'consultations',
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        message: data.message,
        status: 'new', // Начальный статус из вашей конфигурации
      },
    })

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error('Payload API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
