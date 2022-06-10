import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";

const MainHeader = ({ userDetails, setUserDetails }) => {
    useEffect(() => {
        console.log("MainHeader");
        console.log(userDetails);
    }, [userDetails]);

    return (
        <header className={classes.header}>
            <nav>
                <ul>
                    {userDetails.isStudent && (
                        <li>
                            <NavLink activeClassName={classes.active} to={`/student/${userDetails.id}`}>
                                Dashboard
                            </NavLink>
                        </li>
                    )}
                    {userDetails.isInstructor && (
                        <li>
                            <NavLink activeClassName={classes.active} to="/form">
                                Create a Session
                            </NavLink>
                        </li>
                    )}
                    {userDetails.isLoggedIn && (
                        <li>
                            <button
                            className={classes['logout-button']}
                                onClick={() => {
                                    setUserDetails({
                                        isLoggedIn: false,
                                        isStudent: false,
                                        isInstructor: false,
                                        id: null,
                                    });
                                    localStorage.clear();
                                }}>
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default MainHeader;
