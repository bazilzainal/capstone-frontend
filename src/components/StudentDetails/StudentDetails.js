import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import "./StudentDetails.css";
import { TbClock } from "react-icons/tb";
import { BsCalendarDate } from "react-icons/bs";

function StudentSessions({ student, studentId }) {
    const [studentSessions, setStudentSessions] = useState([]);

    useEffect(() => {
        async function loadStudentSessions() {
            const response = await fetch("http://localhost:8080/sessions/student/" + studentId);
            if (!response.ok) {
                console.log("Something went wrong");
                // Oops! Something went wrong
                return;
            }

            const studentSessions = await response.json();
            setStudentSessions(studentSessions);
        }

        loadStudentSessions();
    }, [studentId]);

    return (
        <div className="session-container">
            {studentSessions.map((session) => (
                <div key={session.sessionId}>
                    <h3>
                        <span className="session-name">{session.sessionName}</span> with{" "}
                        <span className="instructor-name">{session.instructorFirstName}</span>
                    </h3>
                    <ul>
                        <li>
                            <TbClock /> {moment(session.sessionTime, "HH:mm").format("hh:mmA").toString()}
                        </li>
                        <li>
                            <BsCalendarDate /> {moment(session.sessionDate).format("D MMM YYYY").toString()}
                        </li>
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default function StudentDetails() {
    const studentId = useParams().studentId;
    const [student, setStudent] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    // Load a student when studentId changes and set isLoaded to true
    useEffect(() => {
        async function loadStudent() {
            const response = await fetch("http://localhost:8080/students/" + studentId);
            if (!response.ok) {
                console.log("Something went wrong");
                // Oops! Something went wrong
                return;
            }

            const student = await response.json();
            setStudent(student);
            setIsLoaded(true);
        }

        loadStudent();
    }, [studentId]);

    // TODO remove later
    // Log student details to console when student is loaded
    useEffect(() => {
        console.log("StudentDetails loaded");
        console.log(Object.entries(student));
    }, [student]);

    // Render loading message if student is not loaded
    if (!isLoaded) {
        console.log("StudentDetails isLoaded is false");
        return <div>Loading...</div>;
    }

    // Render student details
    return (
        <div>
            <div>
                <h2>
                    <span className="namaste">Namaste, </span>
                    <span className="student-greet">{student.firstName}</span>
                </h2>
                {/* <p>Your Student ID is: {student.studentId}</p> */}
            </div>
            <div>
                <h4>Here's what you have going on:</h4>
                <hr />
                <StudentSessions student={student} studentId={studentId} />
            </div>
        </div>
    );
}
