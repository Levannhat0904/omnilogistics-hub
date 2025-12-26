/**
 * Currency formatting utilities
 */

/**
 * Formats a number as Vietnamese Dong (VND)
 * @param value Number to format
 * @returns Formatted currency string (e.g., "1.200.000 đ")
 */
export const formatCurrency = (value: number) => {
  return `${value.toLocaleString('vi-VN')} đ`;
};
