import { useState } from "react";
import "./index.css";
import "./styles.css";

import { formatDate } from "./utils";
import Calendar from "./Calendar";

const initialDate = "2022-06-27";

export default function App() {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [currentMonth, setCurrentMonth] = useState(formatDate(selectedDate));

  return (
    <div className="px-4">
      {/* <span className="text-center">{currentMonth}</span> */}
      <Calendar
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onChangeMonth={setCurrentMonth}
        onSelectedDate={setSelectedDate}
      />
    </div>
  );
}
