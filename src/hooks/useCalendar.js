import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useCallback, useLayoutEffect, useRef } from "react";
import { calculateMonthDays, formatDate } from "../utils";

dayjs.extend(isBetween);

function useCalendar({
  monthsToShow = 1,
  onChange,
  minDate,
  maxDate,
  currentMonth,
  setCurrentMonth,
  setSelectedDate
}) {
  const range = calculateMonthDays({
    currentMonth,
    monthsToShow
  });

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const start = range[0][0];
    const lastMonth = range[range.length - 1];

    const end = lastMonth[lastMonth.length - 1];
    onChange &&
      onChange({
        start,
        end
      });
  }, [range, onChange]);

  const nextMonth = useCallback(() => {
    const nextMonth = dayjs(currentMonth).add(1, "month");
    const firstDateNextMonth = nextMonth.startOf("month");
    const lastDateNextMonth = nextMonth.endOf("month");

    if (
      !dayjs(maxDate).isBetween(
        firstDateNextMonth,
        lastDateNextMonth,
        "day",
        "[]"
      )
    ) {
      setCurrentMonth(nextMonth);
    }
  }, [currentMonth, maxDate, setCurrentMonth]);

  const previousMonth = useCallback(() => {
    const previousMonth = dayjs(currentMonth).subtract(1, "month");
    const firstDatePreviousMonth = previousMonth.startOf("month");
    const lastDatePreviousMonth = previousMonth.endOf("month");
    // setCurrentMonth(dayjs(currentMonth).subtract(1, "month"));
    if (
      !dayjs(minDate).isBetween(
        firstDatePreviousMonth,
        lastDatePreviousMonth,
        "day",
        "[]"
      )
    ) {
      setCurrentMonth(previousMonth);
    }
  }, [currentMonth, setCurrentMonth, minDate]);

  const selectDate = useCallback(
    (date) => {
      if (dayjs(date).get("month") !== dayjs(currentMonth).get("month")) {
        setCurrentMonth(formatDate(date));
        setSelectedDate(date);
      } else {
        setSelectedDate(date);
      }
    },
    [currentMonth, setCurrentMonth, setSelectedDate]
  );

  return {
    selectDate,
    currentMonthNames:
      monthsToShow === 1
        ? dayjs(currentMonth).format("MMMM")
        : `${dayjs(currentMonth).format("MMMM")}-${dayjs(currentMonth)
            .add(1, "month")
            .format("MMMM")}`,
    range,
    nextMonth,
    previousMonth
  };
}

export default useCalendar;
