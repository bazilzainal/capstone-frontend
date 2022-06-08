import React from "react";
import SessionForm from "./SessionForm";

export default function Form({ userDetails }) {
    if (userDetails.isInstructor) {
        return <SessionForm userDetails={userDetails} />;
    }
}
