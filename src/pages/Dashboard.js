import React, { useEffect, useState } from "react";
import Calendar from "../components/Calendar/Calendar";
import SessionDateList from "../components/Session/SessionDateList";

const Dashboard = () => {
    const [visible, setVisible] = useState({
        dateList: true,
    });
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        console.log("Date Value ");
        console.log(date);
    }, [date]);

    return (
        <div>
            <Calendar value={date} onChange={setDate} />
            <SessionDateList date={date} />

        </div>
    );
};

export default Dashboard;
