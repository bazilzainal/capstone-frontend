import React from "react";

export default function StudentForm() {
    const timeValues = [
        "8:00 AM",
        "8:30 AM",
        "9:00 AM",
        "9:30 AM",
        "10:00 AM",
        "10:30 AM",
        "11:00 AM",
        "11:30 AM",
        "12:00 PM",
        "12:30 PM",
        "1:00 PM",
        "1:30 PM",
        "2:00 PM",
        "2:30 PM",
        "3:00 PM",
        "3:30 PM",
        "4:00 PM",
        "4:30 PM",
        "5:00 PM",
        "5:30 PM",
        "6:00 PM",
        "6:30 PM",
        "7:00 PM",
    ];

    return (
        // A component that renders a form for a student to fill out
        <div>
            <h1>Student Form</h1>
            <form>
                <label>
                    Name:
                    <input type="text" name="name" />
                </label><br />
                <label>
                    Email:
                    <input type="text" name="email" />
                </label><br />
                <label>
                    Phone:
                    <input type="text" name="phone" />
                </label><br />
                <label>
                    Address:
                    <input type="text" name="address" />
                </label><br />
                <label>
                    Time
                    <select name="time" id="time">
                        {timeValues.map((time, index) => {
                            return <option key={index}>{time}</option>;
                        }
                        )}
                    </select>
                </label><br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
