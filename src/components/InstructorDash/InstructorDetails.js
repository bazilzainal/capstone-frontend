import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TbClock } from "react-icons/tb";
import { BsCalendarDate } from "react-icons/bs";
import { IoPeopleSharp } from "react-icons/io5";
import moment from "moment";

export default function InstructorDetails() {
    const instructorId = useParams().instructorId;
    const [instructor, setInstructor] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    // Load a student when studentId changes and set isLoaded to true
    useEffect(() => {
        async function loadInstructor() {
            const response = await fetch("http://localhost:8080/instructors/" + instructorId);
            if (!response.ok) {
                console.log("Something went wrong");
                // Oops! Something went wrong
                return;
            }

            const instructor = await response.json();
            setInstructor(instructor);
            setIsLoaded(true);
        }

        loadInstructor();
    }, [instructorId]);

    console.log("Instructor");
    console.log(instructor);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Welcome to the Instructor Dashboard</h2>
            <h3>
                {instructor.firstName} {instructor.lastName}
            </h3>
            <h4>Here's what you have going on:</h4>
            <hr />
            <div className="session-container">
                {instructor.sessionsByInstructorId.map((session) => {
                    return (
                        moment(session.sessionDate + "T" + session.sessionTime).isAfter(moment()) && (
                            <div key={session.sessionId}>
                                <h3>
                                    <span className="session-name">{session.sessionName}</span>
                                </h3>
                                <ul>
                                    <li>
                                        <TbClock /> {moment(session.sessionTime, "HH:mm").format("hh:mmA").toString()}
                                    </li>
                                    <li>
                                        <BsCalendarDate /> {moment(session.sessionDate).format("D MMM YYYY").toString()}
                                    </li>
                                    <li>
                                        <IoPeopleSharp /> {session.participatesBySessionId.length} student(s)
                                    </li>
                                </ul>
                            </div>
                        )
                    );
                })}
            </div>
        </div>
    );
}
