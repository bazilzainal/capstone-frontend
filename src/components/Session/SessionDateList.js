import moment from "moment";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SessionDateList = ({ date }) => {
    const [sessions, setSessions] = useState([]);

    let momentDate = moment(date).format("YYYY-MM-DD");
    console.log("SessionDateList date: " + momentDate);

    useEffect(() => {
        console.log("Fetching with date " + momentDate);
        async function loadSessions() {
            const response = await fetch("http://localhost:8080/sessions/date/" + momentDate);
            if (!response.ok) {
                console.log("something went wrong");
                // oups! something went wrong
                return;
            }

            const sessions = await response.json();
            setSessions(sessions);
        }

        loadSessions();
    }, [momentDate]);

    return (
        <div>
            <h3>{momentDate}</h3>
            <ul>
                {sessions.map((session) => (
                    <li key={session.sessionId}>
                        <Link to={`/session/${session.sessionId}`}>{session.sessionName}</Link>
                        <ul>
                            <li>Time: {moment(session.sessionTime, "HH:mm").format("HH:mmA").toString()}</li>
                            <li>Instructor ID: {session.instructorId}</li>
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SessionDateList;
