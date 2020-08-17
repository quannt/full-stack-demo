export const format = (
  date,
  timeStyle = "medium",
  dateStyle = "short",
  locale = "en"
) => {
  return new Intl.DateTimeFormat(locale, { timeStyle, dateStyle }).format(date);
};
