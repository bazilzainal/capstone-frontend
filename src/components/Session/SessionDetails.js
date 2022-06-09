import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function SessionDetails({ userDetails }) {
    const { sessionId } = useParams();
    const [session, setSession] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [values, setValues] = useState({
        sessionId: parseInt(sessionId),
        studentId: userDetails.id,
    });

    const history = useHistory();

    const routeChange = () => {
        let path = `/`;
        history.push(path);
    };

    useEffect(() => {
        console.log("Fetching session details");
        async function loadSession() {
            const response = await fetch(`http://localhost:8080/sessions/${sessionId}`);
            if (!response.ok) {
                console.log("something went wrong");
                // oups! something went wrong
                return;
            }

            const session = await response.json();
            setSession(session);
            setIsLoaded(true);
        }

        loadSession();
    }, [sessionId]);

    const submitParticipation = async (e) => {
        e.preventDefault();
        console.log("Submitted values: ");
        console.log(values);

        async function submit() {
            // POST request using fetch with async/await
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            };

            console.log("requestOptions: ");
            console.log(requestOptions);

            fetch("http://localhost:8080/participates", requestOptions)
                .then(async (response) => {
                    const isJson = response.headers.get("content-type")?.includes("application/json");
                    const data = isJson && (await response.json());

                    // check for error response
                    if (!response.ok) {
                        console.log("Response text " + (await response.text()));
                        // get error message from body or default to response status
                        console.log("Error: " + data.message || response.status);
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                })
                .catch((error) => {
                    console.error("There was an error!", error);
                });
            routeChange();
            console.log("Route changed");
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

            {userDetails.isStudent && <button onClick={submitParticipation}>Join Class</button>}
        </div>
    );
}
