import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";

const MainHeader = ({ userId }) => {
    return (
        <header className={classes.header}>
            <nav>
                <ul>
                    <li>
                        {/* <a href='/welcome'>Welcome</a> */}
                        <NavLink activeClassName={classes.active} to="/dashboard">
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        {/* <a href='/welcome'>Welcome</a> */}
                        <NavLink activeClassName={classes.active} to="/form">
                            Create a Session
                        </NavLink>
                    </li>
                    <li>
                        {/* <a href='/welcome'>Welcome</a> */}
                        <NavLink activeClassName={classes.active} to={`/student/${userId}`}>
                            Student
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainHeader;
