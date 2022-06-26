import { useState } from "react";
import "./index.css";
import "./styles.css";

import useCalendar from "./hooks/useCalendar";
import { formatDate, formatToDay } from "./utils";
import dayjs from "dayjs";

const initialDate = "2022-06-27";

export default function App() {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [currentMonth, setCurrentMonth] = useState(formatDate(selectedDate));

  const {
    range,
    nextMonth,
    previousMonth,
    // selectedDate,
    selectDate
  } = useCalendar({
    // initialDate: "2022-06-27"
    monthsToShow: 1,
    currentMonth,
    setCurrentMonth,
    setSelectedDate,
    // onChange: (date) => {
    //   // console.log(date);
    // },
    maxDate: "2022-09-01"
  });
  // console.log(range);

  return (
    <div className="px-4">
      {/* <span className="text-center">{currentMonth}</span> */}
      <div className="grid grid-cols-7">
        {range.map((month) => {
          return month.map((day, i) => {
            const isSelectedDate = day.date === selectedDate;

            return (
              <div
                key={`${day.date}-${i}`}
                className={`border hover:pointer ${
                  !day.isCurrentMonth && "text-gray-400"
                } ${isSelectedDate && "text-red-500"}`}
                onClick={() => {
                  // handleClick(date);
                  selectDate(day.date);
                }}
              >
                {formatToDay(day.date)} - {dayjs(day.date).format("ddd")}
              </div>
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
