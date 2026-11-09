export const formatNaira = (amount: number): string => `₦${new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(Number.isFinite(amount) ? amount : 0)}`;

export const formatShortNaira = (amount: number): string => {
  if (!Number.isFinite(amount)) return '₦0';
  if (amount >= 1_000_000_000) return `₦${(amount / 1_000_000_000).toLocaleString('en-NG', { maximumFractionDigits: 1 })}bn`;
  if (amount >= 1_000_000) return `₦${(amount / 1_000_000).toLocaleString('en-NG', { maximumFractionDigits: 1 })}m`;
  return formatNaira(amount);
};
