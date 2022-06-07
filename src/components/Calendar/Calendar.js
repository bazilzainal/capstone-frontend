import React, { useState } from "react";
import CalendarDays from "./CalendarDays";
import "./Calendar.css";

const Calendar = () => {
    const [currentDay, setCurrentDay] = useState(new Date());


    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return (
        <div className="calendar">
            <div className="calendar-header">
                <h2>
                    {months[currentDay.getMonth()]} {currentDay.getFullYear()}
                </h2>
            </div>
            <div className="calendar-body">
                <div className="table-header">
                    {weekdays.map((weekday) => {
                        return (
                            <div className="weekday">
                                <p>{weekday}</p>
                            </div>
                        );
                    })}
                </div>
                <CalendarDays day={currentDay} setCurrentDay={setCurrentDay} />
            </div>
        </div>
    );
};

export default Calendar;
