/**
 *
 * @param monthName
 * @returns the start and end of the month
 */
function getMonthDateRange(monthName) {
  // Validate month name
  const months = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ];

  const monthIndex = months.indexOf(monthName.toLowerCase());

  if (monthIndex === -1) {
    throw new Error('Invalid month name');
  }

  // Create dates for the first and last day of the month
  const currentYear = new Date().getFullYear();
  const startDate = new Date(currentYear, monthIndex, 1);
  const endDate = new Date(currentYear, monthIndex + 1, 0);

  return {
    start: startDate,
    end: endDate,
  };
}

export default getMonthDateRange;
