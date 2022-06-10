import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { toast, Slide } from "react-toastify";

export default function SessionDetails({ userDetails }) {
    const { sessionId } = useParams();
    const [session, setSession] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [values, setValues] = useState({
        sessionId: parseInt(sessionId),
        studentId: userDetails.id,
    });

    const history = useHistory();

    const successToast = () => {
        toast.success("🐶 Signed up! Time to be present.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide
        });
    };

    const errorToast = () => {
        toast.error("You've already joined this class. Om. 🧘🏽 🧘🏽‍♀️", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide
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

    // GET session details from server and set session state when sessionId changes
    useEffect(() => {
        console.log("Fetching session details");
        async function loadSession() {
            const response = await fetch(`http://localhost:8080/sessions/${sessionId}`);
            if (!response.ok) {
                console.log("Something went wrong");
                // Oops! Something went wrong
                return;
            }

            const session = await response.json();
            setSession(session);
            setIsLoaded(true);
        }

        loadSession();
    }, [sessionId]);

    // POST request to create a new session
    const submitParticipation = async (e) => {
        e.preventDefault();
        console.log("Submitted values: ");
        console.log(values);

        let isError = false;

        async function submit() {
            // POST request using fetch with async/await
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            };

            // TODO remove later
            console.log("requestOptions: ");
            console.log(requestOptions);

            fetch("http://localhost:8080/participates", requestOptions)
                .then(async (response) => {
                    const isJson = response.headers.get("content-type")?.includes("application/json");
                    const data = isJson && (await response.json());

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        console.log("Error: " + data.message || response.status);
                        const error = (data && data.message) || response.status;

                        routeChange(true);
                        return Promise.reject(error);
                    }
                })
                .then(() => {
                    routeChange(isError);
                    console.log("Route changed");
                })
                .catch((error) => {
                    console.error("Error: " + error);
                });
        }

        submit();
        console.log("Values submitted");
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{session.sessionName}</h2>
            <p>Session ID: {sessionId}</p>
            <p>Date: {session.sessionDate}</p>
            <p>Time: {session.sessionTime}</p>
            <p>Description: {session.sessionDesc}</p>

            {userDetails.isStudent && (
                <button className="button" onClick={submitParticipation}>
                    Join Class
                </button>
            )}
        </div>
    );
}
