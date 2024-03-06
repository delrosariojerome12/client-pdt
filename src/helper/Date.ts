export function formatDateDDMMYY(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2); // Extract last 2 digits of the year

  return `${day}/${month}/${year}`;
}
