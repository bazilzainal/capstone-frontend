import moment from "moment";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Session.css";

const SessionDateList = ({ date }) => {
    const [sessions, setSessions] = useState([]);
    let momentDate = moment(date).format("YYYY-MM-DD");
    console.log("SessionDateList date: " + momentDate);

    const loadSessionHandler = (isError, sessions) => {
        if (!isError) {
            setSessions([]);
        } else {
            setSessions(sessions);
        }
    };

    useEffect(() => {
        console.log("Fetching with date " + momentDate);
        async function loadSessions() {
            fetch("http://localhost:8080/sessions/date/" + momentDate)
                .then(async (response) => {
                    const sessions = await response.json();

                    // Check for error response
                    if (!response.ok) {
                        // Get error message from body or default to response status
                        console.log("Error: " + sessions.message || response.status);
                        const error = (sessions && sessions.message) || response.status;

                        loadSessionHandler(false, sessions);
                        return Promise.reject(error);
                    }

                    loadSessionHandler(true, sessions);
                })
                .catch((error) => {
                    console.error("There was an error!", error);
                });
        }

        loadSessions();
    }, [momentDate]);

    return (
        <div className="list-container">
            <table>
                <tbody>
                    {sessions.length != 0 &&
                        sessions.map(
                            (session) => {

                                // Only return timeslots that are after the current time
                                return (
                                    moment(session.sessionDate + "T" + session.sessionTime).isAfter(moment()) && (
                                        <tr key={session.sessionId}>
                                            <td className="bubble">
                                                <Link to={`/session/${session.sessionId}`}>
                                                    <div>
                                                        {moment(session.sessionTime, "HH:mm:ss")
                                                            .format("hh.mm A")
                                                            .toString()}
                                                    </div>
                                                </Link>
                                            </td>
                                            <td>
                                                <Link to={`/session/${session.sessionId}`}>{session.sessionName}</Link>
                                            </td>
                                            <td>
                                                <Link to={`/session/${session.sessionId}`}>
                                                    {session.instructorFirstName}
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                );
                            }
                        )}
                    {sessions.length == 0 && (
                        <tr>
                            <td colSpan="3">
                                <div className="no-sessions">No sessions found for this date.</div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SessionDateList;
