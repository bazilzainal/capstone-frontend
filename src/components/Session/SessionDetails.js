import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SessionDetails() {
    const { sessionId } = useParams();
    const [session, setSession] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [values, setValues] = useState({
        sessionId: sessionId,
        studentId: ""
    });

    useEffect(() => {
        console.log("Detail effect happening");
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
            console.log("Line 16 " + session);
        }

        loadSession();
    }, [sessionId]);

    const submitParticipation = async (e) => {
        e.preventDefault();
        console.log("Submitted values: ");
        console.log(values);
    }

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
            <button onClick={submitParticipation}>Submit</button>
        </div>
    );
}
