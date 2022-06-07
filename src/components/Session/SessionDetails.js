import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function SessionDetails() {
    const { sessionId } = useParams();
    const [session, setSession] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    let history = useHistory();

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


    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>SessionDet</h1>
            <h2>{sessionId}</h2>
            <p>{session.sessionName}</p>
            <p>{session.sessionDate}</p>
            <p>{session.sessionTime}</p>
            <p>{session.sessionDesc}</p>
            
            <button onClick={history.goBack}>Back</button>
        </div>
    );
}
