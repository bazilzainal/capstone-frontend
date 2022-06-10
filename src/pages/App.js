import React from "react";
import Dashboard from "./Dashboard";
import MainHeader from "../components/Navbar/MainHeader";
import DashContent from "./DashContent";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ userDetails, setUserDetails }) {
    return (
        <div>
            <div>
                <header>
                    <MainHeader userDetails={userDetails} setUserDetails={setUserDetails} />
                </header>
            </div>
            <div className="container">
                <ToastContainer></ToastContainer>
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
