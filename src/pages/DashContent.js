import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import SessionDetails from "../components/Session/SessionDetails";

export default function DashContent() {
    return (
        <Switch>
            <Route path="/session/:sessionId">
                <SessionDetails />
            </Route>
        </Switch>
    );
}
