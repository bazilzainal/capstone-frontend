import React, { useState, useEffect } from "react";
import SessionDateList from "./Session/SessionDateList";
import moment from "moment";

const Dates = ({ currDate, setCurrDate }) => {

    const clickHandler = (date) => {
        console.log("Clicked");
        console.log(date);
        setCurrDate(date);
    };

    return (
        <div>
            <h1>Dates</h1>
            <h3>{currDate}</h3>
            <ul>
                <li>
                    <button
                        onClick={() => {
                            clickHandler("2022-06-07");
                        }}>
                        "2022-06-07"
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => {
                            clickHandler("2022-06-08");
                        }}>
                        "2022-06-08"
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => {
                            clickHandler("2022-06-09");
                        }}>
                        "2022-06-09"
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => {
                            clickHandler("2022-06-10");
                        }}>
                        "2022-06-10"
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => {
                            clickHandler("2022-06-11");
                        }}>
                        "2022-06-11"
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Dates;
