// Telegram Bot Service for IClone EVN Notifications
// This service handles sending order and contact notifications to Telegram

const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || ''
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || ''

// Send message to Telegram Bot
export const sendTelegramNotification = async (message) => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log('📱 Telegram credentials not configured')
    return { success: false, error: 'Telegram credentials not configured' }
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    })

    const data = await response.json()
    
    if (response.ok) {
      console.log('✅ Telegram notification sent successfully')
      return { success: true, data }
    } else {
      console.error('❌ Telegram notification failed:', data)
      return { success: false, error: data.description || 'Failed to send message' }
    }
  } catch (error) {
    console.error('💥 Telegram notification error:', error)
    return { success: false, error: error.message }
  }
}

// Format order notification message
export const formatOrderNotification = (order) => {
  const itemsList = order.items?.map(item => 
    `• ${item.name} - ${item.price.toLocaleString()} ֏ × ${item.quantity}`
  ).join('\n') || ''

  return `
📦 <b>NEW ORDER!</b>

👤 <b>Customer:</b>
${order.address?.name || 'N/A'}
📞 ${order.address?.phone || 'N/A'}

🛒 <b>Items:</b>
${itemsList}

💰 <b>Total:</b> ${order.total.toLocaleString()} ֏

📍 <b>Delivery Address:</b>
${order.address?.street || 'N/A'}
${order.address?.city || 'N/A'}

📅 <b>Order Time:</b>
${new Date(order.createdAt).toLocaleString('hy-AM')}

🔗 <b>Order ID:</b> #${order.id}
  `.trim()
}

// Format contact notification message
export const formatContactNotification = (message) => {
  return `
💬 <b>NEW CONTACT INQUIRY!</b>

👤 <b>From:</b> ${message.name || 'N/A'}
📧 <b>Email:</b> ${message.email || 'N/A'}
📞 <b>Phone:</b> ${message.phone || 'N/A'}

📝 <b>Subject:</b> ${message.subject || 'No Subject'}

💭 <b>Message:</b>
${message.message || 'No message'}

📅 <b>Time:</b> ${new Date(message.createdAt).toLocaleString('hy-AM')}
  `.trim()
}

// Send order notification
export const notifyOrderPlaced = async (order) => {
  const message = formatOrderNotification(order)
  return await sendTelegramNotification(message)
}

// Send contact notification
export const notifyContactMessage = async (contactMessage) => {
  const formattedMessage = formatContactNotification(contactMessage)
  return await sendTelegramNotification(formattedMessage)
}
