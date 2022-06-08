import React, { useState } from "react";
import Dashboard from "./Dashboard";
import MainHeader from "../components/Navbar/MainHeader";
import "./App.css";
import DashContent from "./DashContent";

export default function App() {
    const [userDetails, setUserDetails] = useState({
        isStudent: true,
        isInstructor: true, //TODO remove this and implement "Login"
        id: 2,
    });

    return (
        <div>
            <div>
                <header>{userDetails.isStudent && <MainHeader userDetails={userDetails} />}</header>
            </div>
            <div className="container">
                <main className="sidebar">
                    <Dashboard userDetails={userDetails} />
                </main>
                <div className="content">
                    <DashContent userDetails={userDetails} />
                </div>
            </div>
        </div>
    );
}
