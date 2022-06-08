import React, { useState } from "react";
import Dashboard from "./Dashboard";
import MainHeader from "../components/Navbar/MainHeader";
import "./App.css";
import DashContent from "./DashContent";

export default function App() {
    const [userId, setUserId] = useState(1);

    return (
        <div>
            <div>
                <header>
                    <MainHeader userId={userId} />
                </header>
            </div>
            <div className="container">
                <main className="sidebar">
                    <Dashboard />
                </main>
                <div className="content">
                    <DashContent />
                </div>
            </div>
        </div>
    );
}
