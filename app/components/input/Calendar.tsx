"use client";

import { RangeKeyDict, Range, DateRange } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

const Calendar = ({ value, onChange, disabledDates }: CalendarProps) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      disabledDates={disabledDates}
      minDate={new Date()}
      direction="vertical"
      showDateDisplay={false}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
    />
  );
};

export default Calendar;
