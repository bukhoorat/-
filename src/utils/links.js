// Normalize an Iranian phone number to international wa.me format
export function normalizeWhatsAppNumber(number) {
  if (!number) return ''
  let num = number.replace(/[^\d+]/g, '')
  // Already has country code
  if (num.startsWith('+98')) num = num.slice(1)
  else if (num.startsWith('0098')) num = '98' + num.slice(4)
  else if (num.startsWith('98')) return num
  // Iranian local number with leading 0
  else if (num.startsWith('0')) num = '98' + num.slice(1)
  // Assume Iranian number without leading 0
  else if (num.startsWith('9')) num = '98' + num
  return num
}

export function buildWhatsAppLink(number, message) {
  const normalized = normalizeWhatsAppNumber(number)
  if (!normalized) return '#'
  const encoded = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${normalized}${encoded}`
}

export function buildInstagramLink(username) {
  if (!username) return '#'
  return `https://www.instagram.com/${username.replace(/^@/, '')}/`
}

export function buildProductWhatsAppLink(number, productName, lang) {
  const msg = lang === 'fa'
    ? `سلام، درباره عطر ${productName} از برند ZAREN اطلاعات بیشتری می‌خواهم.`
    : `Hello, I'd like more information about ZAREN ${productName}.`
  return buildWhatsAppLink(number, msg)
}
