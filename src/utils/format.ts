export const formatNaira = (amount: number): string => new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  currencyDisplay: 'narrowSymbol',
  maximumFractionDigits: 0,
}).format(Number.isFinite(amount) ? amount : 0);
