import React from "react";
import Dashboard from "./Dashboard";
import { Route, Switch, Redirect } from "react-router-dom";
import SessionDetails from "../components/Session/SessionDetails";
import MainHeader from "../components/Navbar/MainHeader";
import StudentForm from "../components/StudentForm/StudentForm";
import StudentDetails from "../components/StudentDetails/StudentDetails";

export default function App() {
    return (
        <div>
            <header>
                <MainHeader />
            </header>
            <main>
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/dashboard" />
                    </Route>
                    <Route path="/dashboard">
                        <Dashboard />
                    </Route>
                    <Route path="/session/:sessionId">
                        <SessionDetails />
                    </Route>
                    <Route path="/form">
                        <StudentForm></StudentForm>
                    </Route>
                    <Route path="/student/:studentId">
                        <StudentDetails />
                    </Route>

                </Switch>
            </main>
        </div>
    );
}
