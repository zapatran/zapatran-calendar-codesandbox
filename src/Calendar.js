import "./index.css";
import "./styles.css";

import useCalendar from "./hooks/useCalendar";
import { formatToDay } from "./utils";
import dayjs from "dayjs";

export default function Calendar({
  selectedDate,
  currentMonth,
  onSelectedDate,
  onChangeMonth
}) {
  const {
    range,
    nextMonth,
    previousMonth,
    selectDate,
    currentMonthNames
  } = useCalendar({
    monthsToShow: 2,
    currentMonth,
    setCurrentMonth: onChangeMonth,
    setSelectedDate: onSelectedDate,
    minDate: "2022-03-01",
    maxDate: "2022-09-01"
  });

  return (
    <div className="px-4">
      <span className="text-center">{currentMonthNames}</span>
      <div className="grid grid-cols-7">
        {range.map((month) => {
          return month.map((day, i) => {
            const isSelectedDate = day.date === selectedDate;

            return day.isCurrentMonth ? (
              <div
                key={`${day.date}-${i}`}
                className={`border hover:pointer ${
                  !day.isCurrentMonth && "text-gray-400"
                } ${isSelectedDate && "text-red-500"}`}
                onClick={() => {
                  selectDate(day.date);
                }}
              >
                {formatToDay(day.date)} - {dayjs(day.date).format("ddd")}
              </div>
            ) : (
              <div />
            );
          });
        })}
      </div>
      <div className="flex">
        <button onClick={previousMonth}>previous Month</button>
        <span className="flex-grow" />
        <button
          onClick={() => {
            selectDate("2022-07-01");
          }}
        >
          set date
        </button>
        <span className="flex-grow" />
        <button onClick={nextMonth}>next Month</button>
      </div>
    </div>
  );
}
