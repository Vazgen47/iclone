// Shared localStorage utilities for all data types
// This ensures consistent data management across the app

// Generic localStorage helpers
export const loadFromStorage = (key, defaultValue = null) => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : defaultValue
    } catch (error) {
      console.error(`Error parsing ${key} from localStorage:`, error)
      return defaultValue
    }
  }
  return defaultValue
}

export const saveToStorage = (key, data) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(data))
      console.log(`💾 Saved ${key} to localStorage:`, data)
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
    }
  }
}

// Orders management
export const getOrders = () => loadFromStorage('iclone_orders', [])
export const saveOrder = (order) => {
  const orders = getOrders()
  orders.push({
    ...order,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  })
  saveToStorage('iclone_orders', orders)
  return orders
}

// Messages management
export const getMessages = () => loadFromStorage('iclone_messages', [])
export const saveMessage = (message) => {
  const messages = getMessages()
  messages.push({
    ...message,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  })
  saveToStorage('iclone_messages', messages)
  return messages
}

// Addresses management
export const getAddresses = () => loadFromStorage('iclone_addresses', [])
export const saveAddress = (address) => {
  const addresses = getAddresses()
  addresses.push({
    ...address,
    id: Date.now().toString()
  })
  saveToStorage('iclone_addresses', addresses)
  return addresses
}
