import React, { useState, useEffect } from "react";
import timeValues from "./TimeVal";
import moment from "moment";

export default function SessionForm({ userDetails }) {
    const [formValues, setFormValues] = useState({
        instructorId: userDetails.id,
        sessionName: "Yoga",
        sessionDate: moment().format("YYYY-MM-DD"),
        sessionTime: "8:00:00",
        sessionDesc: "Some kind of Yoga",
    });

    function handleChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Submitted values: ");
        console.log(formValues);

        async function submit() {
            // POST request using fetch with async/await
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formValues),
            };

            console.log("requestOptions: ");
            console.log(requestOptions);

            fetch("http://localhost:8080/sessions", requestOptions)
                .then(async (response) => {
                    const isJson = response.headers.get("content-type")?.includes("application/json");
                    const data = isJson && (await response.json());

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        console.log("Error: " + data.message || response.status);
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                })
                .catch((error) => {
                    console.error("There was an error!", error);
                });
        }

        submit();
        console.log("Form Submitted");
    }

    return (
        // A component that renders a form for a student to fill out
        <div>
            <h1>Create a Session</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Session Name:
                    <input type="text" name="sessionName" value={formValues.sessionName} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Session Description:
                    <textarea cols={40} rows={5} name="sessionDesc" value={formValues.sessionDesc} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Date
                    <input
                        type="date"
                        name="sessionDate"
                        id="sessionDate"
                        value={formValues.sessionDate}
                        onChange={handleChange}
                        // Ensure that only future dates are allowed
                        min={moment().format("YYYY-MM-DD").toString()}

                        // Ensure that only dates up to one month from now are allowed
                        max={moment().add(1, "month").format("YYYY-MM-DD").toString()}
                    />
                </label>
                <br />
                <label>
                    Time
                    <select value={formValues.sessionTime} onChange={handleChange} name="sessionTime" id="sessionTime">
                        {timeValues.map((time, index) => {
                            return (
                                <option key={index} value={time}>
                                    {time}
                                </option>
                            );
                        })}
                    </select>
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
