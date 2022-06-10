import React from "react";
import SessionForm from "./SessionForm";
import './SessionForm.css'

export default function Form({ userDetails }) {
    if (userDetails.isInstructor) {
        return <SessionForm userDetails={userDetails} />;
    }
}
