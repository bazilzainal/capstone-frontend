import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";

const MainHeader = ({ userDetails }) => {
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
                </ul>
            </nav>
        </header>
    );
};

export default MainHeader;
