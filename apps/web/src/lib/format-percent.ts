export function formatPercent(value: number, fractionDigits = 0): string {
  const safe = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(safe);
}
