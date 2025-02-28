export function formatCoin(value: number): string {
  return value.toLocaleString();
}

export function formatCash(value: number): string {
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatBetEndTime(endTimeUTC: string): string {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: userTimeZone,
    timeZoneName: "short",
  }).format(new Date(endTimeUTC));
}

export function formatBetAmount (value: number | string) {
  if (typeof value === 'number') {
    if (value >= 1_000_000_000) return `${value / 1_000_000_000}B`;
    if (value >= 1_000_000) return `${value / 1_000_000}M`;
    if (value >= 1_000) return `${value / 1_000}K`;
    return value;
  }
  return value;
};
