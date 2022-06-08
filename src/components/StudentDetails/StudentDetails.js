import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function StudentDetails() {
    const studentId = useParams().studentId;
    // const [studentId, setStudentId] = useState(useParams().studentId);
    const [student, setStudent] = useState({});
    const [studentSessions, setStudentSessions] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function loadStudent() {
            const response = await fetch("http://localhost:8080/students/" + studentId);
            if (!response.ok) {
                console.log("something went wrong");
                // oups! something went wrong
                return;
            }

            const student = await response.json();
            setStudent(student);
            setIsLoaded(true);
        }

        loadStudent();
    }, [studentId]);

    useEffect(() => {
        async function loadStudentSessions() {
            const response = await fetch("http://localhost:8080/sessions/student/" + studentId);
            if (!response.ok) {
                console.log("something went wrong");
                // oups! something went wrong
                return;
            }

            const studentSessions = await response.json();
            setStudentSessions(studentSessions);
        }

        loadStudentSessions();
    }, [studentId]);

    useEffect(() => {
        console.log("StudentDetails loaded");
        console.log(Object.entries(student));
    }, [student]);

    if (!isLoaded) {
        console.log("StudentDetails isLoaded is false");
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Namaste, {student.firstName}</h2>
            <p>Your Student ID is: {student.studentId}</p>
            <h4>Sessions</h4>

            {studentSessions.map((session) => (
                <div key={session.sessionId}>
                    <h3>{session.sessionName} with {session.instructorFirstName}</h3>
                    <ul>
                        <li>Session ID: {session.sessionId}</li>
                        <li>Time: {moment(session.sessionTime, "HH:mm").format("HH:mmA").toString()}</li>
                        <li>Date: {moment(session.sessionDate).format("D MMM YYYY").toString()}</li>
                        <li>Instructor ID: {session.instructorId}</li>
                    </ul>
                </div>
            ))}
        </div>
    );
}
