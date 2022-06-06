import React, { useState, useEffect } from "react";

const SessionDetails = (props) => {
    const [session, setSession] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        console.log("Detail effect happening");
        async function loadSession() {
            const response = await fetch(`http://localhost:8080/sessions/${props.currSession}`);
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
    }, [props.currSession]);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Test</h1>
            <p>{session.sessionId}</p>
            <p>{session.sessionName}</p>
            <p>{session.sessionDate}</p>
            <p>{session.sessionTime}</p>
            <p>{session.sessionDesc}</p>

            {console.log("Line 32 session is " + Object.entries(session))}
            {console.log("Line 33 session participants is " + session.participatesBySessionId)}

            {session.participatesBySessionId.map((participant) => (
                <p>{participant.studentId}</p>
            ))}
        </div>
    );
};

export default SessionDetails;
