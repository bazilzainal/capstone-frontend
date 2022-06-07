import React, { useState, useEffect } from "react";

// A react component that fetches a list from a REST endpoint and displays it
// as a list of sessions.
const SessionList = (props) => {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        console.log("List effect happening");
        async function loadSessions() {
            const response = await fetch("http://localhost:8080/sessions");
            if (!response.ok) {
                console.log("something went wrong");
                // oups! something went wrong
                return;
            }

            const sessions = await response.json();
            setSessions(sessions);
        }

        loadSessions();
    }, []);

    const clickHandler = (session) => {
        console.log("Clicked");
        console.log(session.sessionId);
        console.log(session.sessionName);
        props.setVisible({
            sessionList: false,
            sessionDetails: true,
        })

        props.setCurrSession(session.sessionId);
    };

    return (
        <ul>
            <h1>Sessions</h1>
            {sessions.map((session) => (
                <li key={session.sessionId}>
                    <button onClick={() => clickHandler(session)}>
                        {session.sessionName}
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default SessionList;
