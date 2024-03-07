export function formatDateDDMMYYYY(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()); // Extract last 2 digits of the year

  return `${day}/${month}/${year}`;
}

export function formatDateYYYYMMDD(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()); // Full year

  return `${year}-${month}-${day}`;
}

export function formatDateStringMMDDYYYY(inputDate: string) {
  // Split the input string into year, month, and day components
  const [year, month, day] = inputDate.split("-");

  // Rearrange the components to mm-dd-yyyy format
  const formattedDate = `${month}-${day}-${year}`;

  return formattedDate;
}
