import React, { useState, useEffect } from "react";
import timeValues from "./TimeVal";
import moment from "moment";
import { toast, Slide } from "react-toastify";
import { useParams, useHistory } from "react-router-dom";

export default function SessionForm({ userDetails }) {
    const [formValues, setFormValues] = useState({
        instructorId: userDetails.id,
        sessionName: "Yoga",
        sessionDate: moment().format("YYYY-MM-DD"),
        sessionTime: "8:00:00",
        sessionDesc: "Some description",
    });
    const history = useHistory();

    const successToast = () => {
        toast.success("Namaste, your class has been listed. 🙏🏽", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
        });
    };

    const errorToast = (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
        });
    };

    const routeChange = (isError) => {
        console.log("Error in routeChange: ", isError);
        if (isError) {
            errorToast();
        } else {
            successToast();
        }

        let path = `/`;
        history.push(path);
    };

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
        // Prevent page from refreshing
        e.preventDefault();

        // TODO remove later
        console.log("Submitted values: ");
        console.log(formValues);

        if (formValues.sessionName.trim() === '') {
            errorToast("Please enter a name for your class.");
            setFormValues({
                ...formValues,
                sessionName: "Yoga",
            });

            return;
        }

        if (formValues.sessionDesc.trim() === '') {
            errorToast("Please enter a description for your class.");
            setFormValues({
                ...formValues,
                sessionDesc: "Some description",
            });

            return;
        }
        let isError = false;

        async function submit() {
            // Set up our request
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formValues),
            };

            // TODO remove later
            console.log("requestOptions: ");
            console.log(requestOptions);

            // POST request using fetch with async/await
            fetch("http://localhost:8080/sessions", requestOptions)
                .then(async (response) => {
                    const isJson = response.headers.get("content-type")?.includes("application/json");
                    const data = isJson && (await response.json());

                    // Check for error response
                    if (!response.ok) {
                        // Get error message from body or default to response status
                        console.log("Error: " + data.message || response.status);
                        const error = (data && data.message) || response.status;

                        errorToast("There's already a session in this slot. Be in the present. 🧘🏽 🧘🏽‍♀️");
                        // routeChange(true);
                        return Promise.reject(error);
                    }
                })
                .then(() => {
                    routeChange(isError);
                    console.log("Route changed");
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
            <form className="session-form" onSubmit={handleSubmit}>
                <label for="session-name">Session Name:</label>
                <input
                    id="session-name"
                    type="text"
                    name="sessionName"
                    value={formValues.sessionName}
                    onChange={handleChange}
                />
                <br />
                <label for="session-desc">Session Description:</label>
                <textarea
                    id="session-desc"
                    cols={40}
                    rows={5}
                    name="sessionDesc"
                    value={formValues.sessionDesc}
                    onChange={handleChange}
                />
                <br />
                <label for="session-date">Date:</label>
                <input
                    id="session-date"
                    type="date"
                    name="sessionDate"
                    value={formValues.sessionDate}
                    onChange={handleChange}
                    // Ensure that only future dates are allowed
                    min={moment().format("YYYY-MM-DD").toString()}
                    // Ensure that only dates up to one month from now are allowed
                    max={moment().add(1, "month").format("YYYY-MM-DD").toString()}
                />
                <br />
                <label for="session-time">Time:</label>
                <select value={formValues.sessionTime} onChange={handleChange} name="sessionTime" id="session-time">
                    {timeValues.map((time, index) => {
                        return (
                            <option key={index} value={time}>
                                {time}
                            </option>
                        );
                    })}
                </select>
                <br />
                <button className="button" type="submit">Submit</button>
            </form>
        </div>
    );
}
