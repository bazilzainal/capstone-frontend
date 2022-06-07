import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import Dates from "../components/Dates";

const Dashboard = () => {
    const [prevDate, setPrevDate] = useState();
    const [currDate, setCurrDate] = useState(moment().format("YYYY-MM-DD"));
    const [visible, setVisible] = useState({
        dateList: true
    });

    useEffect(() => {
        console.log("Prevdate " + prevDate);
    });

    return (
        <div>
            {visible.dateList && (
                <Dates currDate={currDate} setCurrDate={setCurrDate} setPrevDate={setPrevDate} /> 
            )}
        </div>
    );
};

export default Dashboard;
