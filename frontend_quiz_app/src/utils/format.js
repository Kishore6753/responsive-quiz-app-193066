/** PUBLIC_INTERFACE */
export function formatDateTime(ms) {
  /** Formats a timestamp to a friendly local date/time string. */
  if (!ms) return '—';
  try {
    const d = new Date(ms);
    return d.toLocaleString([], { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  } catch (e) {
    return '—';
  }
}
