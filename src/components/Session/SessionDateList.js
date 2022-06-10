import moment from "moment";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Session.css";

const SessionDateList = ({ date }) => {
    const [sessions, setSessions] = useState([]);

    let momentDate = moment(date).format("YYYY-MM-DD");
    console.log("SessionDateList date: " + momentDate);

    useEffect(() => {
        console.log("Fetching with date " + momentDate);
        async function loadSessions() {
            const response = await fetch("http://localhost:8080/sessions/date/" + momentDate);
            if (!response.ok) {
                console.log("Something went wrong");
                // Oops! Something went wrong
                return;
            }

            const sessions = await response.json();
            setSessions(sessions);
        }

        loadSessions();
    }, [momentDate]);

    return (
        <div className="container">
            <table>
                <tbody>
                    {sessions.map((session) => (
                        <tr key={session.sessionId}>
                            <td>
                                <Link to={`/session/${session.sessionId}`}>
                                    <div className="timeslot">
                                        {moment(session.sessionTime, "HH:mm:ss").format("hh.mm A").toString()}
                                    </div>
                                </Link>
                            </td>
                            <td>
                                <Link to={`/session/${session.sessionId}`}>{session.sessionName}</Link>
                            </td>
                            <td>
                                <Link to={`/session/${session.sessionId}`}>{session.instructorFirstName}</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SessionDateList;
