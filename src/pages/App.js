import React, { useState } from "react";
import Dashboard from "./Dashboard";
import MainHeader from "../components/Navbar/MainHeader";
import DashContent from "./DashContent";

export default function App({ userDetails, setUserDetails }) {
    return (
        <div>
            <div>
                <header>
                    <MainHeader userDetails={userDetails} setUserDetails={setUserDetails} />
                </header>
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
