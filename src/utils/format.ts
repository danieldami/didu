export const formatNaira = (amount: number): string => `₦${new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(Number.isFinite(amount) ? amount : 0)}`;
