export function formatDate(isoTimestamp: string): string {
  const date = new Date(isoTimestamp);
  return date.toLocaleString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
