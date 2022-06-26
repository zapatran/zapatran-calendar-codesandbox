import dayjs from "dayjs";
import en from "dayjs/locale/en";

dayjs.locale({
  ...en,
  weekStart: 1
});

export function startDateMonth(date) {
  return dayjs(date).startOf("month").format();
}

export function endDateMonth(date) {
  return dayjs(date).endOf("month").format();
}

export function formatToDay(date) {
  return dayjs(date).format("DD");
}

export function formatDate(date) {
  return dayjs(date).format("YYYY-MM-DD");
}

export function fillDays({ startDate, endDate }) {}

export function calculateMonthDays({ currentMonth, monthsToShow }) {
  const dayMatrix = [];
  const currentDate = dayjs(currentMonth);
  for (let month = 0; month < monthsToShow; month += 1) {
    const dayArray = [];
    const firstDayOfMonth = currentDate.add(month, "month").startOf("month");
    const lastDayOfMonth = firstDayOfMonth.endOf("month");
    const firstDayOfRange = firstDayOfMonth.startOf("week");
    const lastDayOfRange = lastDayOfMonth.endOf("week");
    const extraDaysBefore = firstDayOfMonth.diff(firstDayOfRange, "days");
    const daysInMonth = lastDayOfMonth.diff(firstDayOfMonth, "days");
    const firstDayOfSecondRange = lastDayOfMonth.add(1, "day");
    const extraDaysAfter = lastDayOfRange.diff(firstDayOfSecondRange, "days");

    for (let i = 0; i < extraDaysBefore; i += 1) {
      dayArray.push({
        date: firstDayOfRange.add(i, "days").format("YYYY-MM-DD"),
        isCurrentMonth: false
      });
    }
    for (let i = 0; i <= daysInMonth; i += 1) {
      dayArray.push({
        date: firstDayOfMonth.add(i, "days").format("YYYY-MM-DD"),
        isCurrentMonth: true
      });
    }
    for (let i = 0; i <= extraDaysAfter; i += 1) {
      dayArray.push({
        date: firstDayOfSecondRange.add(i, "days").format("YYYY-MM-DD"),
        isCurrentMonth: false
      });
    }
    dayMatrix.push(dayArray);
  }

  return dayMatrix;
}
