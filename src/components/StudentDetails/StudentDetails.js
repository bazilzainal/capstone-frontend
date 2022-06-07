import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function StudentDetails() {
    const [student, setStudent] = useState({});
    const [studentId, setStudentId] = useState(useParams().studentId);
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
        console.log("StudentDetails");
        console.log(Object.entries(student));
    }, [student]);

    if (!isLoaded) {
        console.log("StudentDetails isLoaded is false");
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>StudentDetails</h1>
            <h2>StudentId: {student.studentId}</h2>
            <p>Name: {student.firstName}</p>
            <h4>Sessions</h4>
            {student.participatesByStudentId.map((session) => {
                return (
                    <div>
                        <p>{session.sessionId}</p>
                    </div>
                );
            })}
        </div>
    );
}
