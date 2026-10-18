import { Language } from './types';

export function whatsappLink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function instagramLink(username: string): string {
  return `https://www.instagram.com/${username}/`;
}

export function whatsappProductMessage(productName: string, lang: Language): string {
  if (lang === 'fa') {
    return `سلام، درباره عطر ${productName} از برند ZAREN اطلاعات بیشری می‌خواهم.`;
  }
  return `Hello, I would like to know more about ZAREN ${productName}.`;
}

export function formatPrice(price: number, currency: string): string {
  return `${price.toLocaleString('en-US')} ${currency}`;
}
