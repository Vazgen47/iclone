import { NextResponse } from 'next/server'
import { saveMessage } from '@/lib/storage'
import { notifyContactMessage } from '@/lib/telegramService'

export async function GET() {
  // Get messages from localStorage
  const messages = []
  return NextResponse.json(messages)
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Create new message with timestamp
    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || '',
      subject: subject || 'Ընդհանուր հարցում',
      message,
      createdAt: new Date().toISOString(),
      status: 'unread',
      priority: 'medium'
    }

    // Save to localStorage
    saveMessage(newMessage)

    // Send Telegram notification
    await notifyContactMessage(newMessage)

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
