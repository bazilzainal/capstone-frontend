import React from "react";
import { Calendar } from "react-calendar";
import { differenceInCalendarDays } from "date-fns";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

const disabledDates = [new Date()];

export default function ModCalendar({ value, onChange }) {
    return <Calendar calendarType="US" onChange={onChange} value={value} />;
}
