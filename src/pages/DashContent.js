import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import SessionDetails from "../components/Session/SessionDetails";
import StudentDetails from "../components/StudentDetails/StudentDetails";
import Form from "../components/Forms/Form";

export default function DashContent({ userDetails }) {
    return (
        <Switch>
            <Route path="/" exact>
                <Redirect to={`/student/${userDetails.id}`} />
            </Route>
            <Route path={`/student/:studentId`}>
                <StudentDetails />
            </Route>
            <Route path="/session/:sessionId">
                <SessionDetails userDetails={userDetails} />
            </Route>
            if (userDeails.isInstructor){" "}
            {
                <Route path="/form">
                    <Form userDetails={userDetails} />
                </Route>
            }
            {/* route to 404 */}
            <Route path="*">
                <NoMatch />
            </Route>
        </Switch>
    );
}

function NoMatch() {
    return <h1>404</h1>;
}
