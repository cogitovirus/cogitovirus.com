const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' });

export function formatDate(date: string) {
  const dateToFormat = new Date(date.replaceAll('-', '/'));
  return dateFormatter.format(dateToFormat);
}

export function dateToISO(date: string) {
  const dateToFormat = new Date(date.replaceAll('-', '/'));
  return dateToFormat.toISOString();
}
