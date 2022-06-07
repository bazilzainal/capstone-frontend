import { NavLink } from 'react-router-dom';
import classes from "./MainHeader.module.css";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            {/* <a href='/welcome'>Welcome</a> */}
            <NavLink activeClassName={classes.active} to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            {/* <a href='/welcome'>Welcome</a> */}
            <NavLink activeClassName={classes.active} to="/form">Create a Session</NavLink>
          </li>
          <li>
            {/* <a href='/welcome'>Welcome</a> */}
            <NavLink activeClassName={classes.active} to="/student/1">Student</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};


export default MainHeader;