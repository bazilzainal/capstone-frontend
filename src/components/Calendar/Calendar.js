import React from 'react';
import moment from 'moment';

const Calendar = () => {

    let weekdayShort = moment.weekdaysShort();
    let weekdayShortName = weekdayShort.map((day, index) => {
        return <th key={index}>{day}</th>
    });

    
    return (
        <div>
            <h1>Calendar</h1>
            {weekdayShortName}
        </div>
    );
}

export default Calendar;