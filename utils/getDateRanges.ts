/**
 * function fot getting date ranges
 * @returns date ranges for filtering events
 */
export function getDateRanges() {
  const now = new Date();

  // Today
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayEnd = new Date(todayStart);
  todayEnd.setDate(todayEnd.getDate() + 1); // End of today (midnight)

  // Tomorrow
  const tomorrowStart = new Date(todayEnd);
  const tomorrowEnd = new Date(tomorrowStart);
  tomorrowEnd.setDate(tomorrowEnd.getDate() + 1); // End of tomorrow

  // Weekend (Saturday and Sunday)
  const dayOfWeek = now.getDay(); // 0 (Sunday) - 6 (Saturday)
  const saturdayStart = new Date(todayStart);
  saturdayStart.setDate(todayStart.getDate() + (6 - dayOfWeek)); // Next Saturday

  const sundayEnd = new Date(saturdayStart);
  sundayEnd.setDate(saturdayStart.getDate() + 2); // End of Sunday

  // Next 7 Days (excluding today)
  const next7DaysStart = new Date(todayEnd); // Tomorrow's start
  const next7DaysEnd = new Date(next7DaysStart);
  next7DaysEnd.setDate(next7DaysEnd.getDate() + 7);

  // Next 30 Days (excluding today)
  const next30DaysStart = new Date(todayEnd); // Tomorrow's start
  const next30DaysEnd = new Date(next30DaysStart);
  next30DaysEnd.setDate(next30DaysEnd.getDate() + 30);

  return {
    todayStart,
    todayEnd,
    tomorrowStart,
    tomorrowEnd,
    weekendStart: saturdayStart,
    weekendEnd: sundayEnd,
    next7DaysStart,
    next7DaysEnd,
    next30DaysStart,
    next30DaysEnd,
  };
}
