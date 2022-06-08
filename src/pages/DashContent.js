import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import SessionDetails from "../components/Session/SessionDetails";
import StudentDetails from "../components/StudentDetails/StudentDetails";

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
                <SessionDetails />
            </Route>
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
