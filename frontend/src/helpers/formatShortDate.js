export function formatShortDate(dateInput) {
  if (!dateInput) return "";

  const date = new Date(dateInput);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}
