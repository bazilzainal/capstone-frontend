import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import SessionDetails from "../components/Session/SessionDetails";
import StudentDetails from "../components/StudentDash/StudentDetails";
import InstructorDetails from "../components/InstructorDash/InstructorDetails";
import Form from "../components/Forms/Form";

export default function DashContent({ userDetails }) {
    return (
        <Switch>
            {userDetails.isStudent && (
                <>
                    <Route path="/" exact>
                        <Redirect to={`/student/${userDetails.id}`} />
                    </Route>
                    <Route path={`/student/:studentId`}>
                        <StudentDetails />
                    </Route>
                    <Route path="/session/:sessionId">
                        <SessionDetails userDetails={userDetails} />
                    </Route>
                </>
            )}
            {userDetails.isInstructor && (
                <>
                    <Route path="/form">
                        <Form userDetails={userDetails} />
                    </Route>
                    <Route path="/session/:sessionId">
                        <SessionDetails userDetails={userDetails} />
                    </Route>
                    <Route path={`/instructor/:instructorId`}>
                       <InstructorDetails />
                    </Route>
                    <Route path="/" exact>
                        <Redirect to={`/instructor/${userDetails.id}`} />
                    </Route>
                </>
            )}

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
