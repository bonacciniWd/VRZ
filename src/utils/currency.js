// Utility for consistent currency formatting across the app
// Supports: USD, BRL, EUR, JPY
// Usage: formatCurrency(1234.56, 'BRL') => R$ 1.234,56

const LOCALE_BY_CURRENCY = {
  USD: 'en-US',
  BRL: 'pt-BR',
  EUR: 'de-DE', // Could choose 'pt-PT' or 'fr-FR' depending on audience
  JPY: 'ja-JP',
};

export function formatCurrency(value, currency = 'BRL') {
  if (value == null || isNaN(value)) return '—';
  const locale = LOCALE_BY_CURRENCY[currency] || 'en-US';
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      currencyDisplay: 'symbol',
      minimumFractionDigits: currency === 'JPY' ? 0 : 2,
      maximumFractionDigits: currency === 'JPY' ? 0 : 2,
    }).format(value);
  } catch (e) {
    return `${currency} ${value.toFixed(2)}`;
  }
}

/**
 * Convert cents (integer) to currency value (float)
 * DB stores amounts as cents to avoid float precision issues
 * @param {number} cents - Amount in cents
 * @returns {number} Amount in currency units (e.g., 1550 cents = 15.50 BRL)
 * @example centsToCurrency(1550) => 15.50
 */
export function centsToCurrency(cents) {
  if (cents == null || isNaN(cents)) return 0;
  return cents / 100;
}

/**
 * Convert currency value (float) to cents (integer)
 * Use when saving to DB
 * @param {number} value - Amount in currency units
 * @returns {number} Amount in cents
 * @example currencyToCents(15.50) => 1550
 */
export function currencyToCents(value) {
  if (value == null || isNaN(value)) return 0;
  return Math.round(value * 100);
}

/**
 * Format cents directly to currency string
 * @param {number} cents - Amount in cents
 * @param {string} currency - Currency code (default BRL)
 * @returns {string} Formatted currency string
 * @example formatCentsAsCurrency(1550, 'BRL') => 'R$ 15,50'
 */
export function formatCentsAsCurrency(cents, currency = 'BRL') {
  return formatCurrency(centsToCurrency(cents), currency);
}

export const SUPPORTED_CURRENCIES = Object.keys(LOCALE_BY_CURRENCY);
