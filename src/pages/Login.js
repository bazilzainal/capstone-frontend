import React, { useEffect, useState } from "react";
import App from "./App";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

export default function Login() {
    const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem("userDetails")) || {});
    const [loginValues, setLoginValues] = useState({
        isStudent: false,
        isInstructor: false,
        id: 1,
    });
    const [formValues, setFormValues] = useState({
        user: "student",
        id: 1,
    });

    // Add userDetails to localStorage when userDetails is set (i.e. after login)
    useEffect(() => {
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
    }, [userDetails]);

    // Add formValues to loginValues when value changes
    useEffect(() => {
        if (formValues.user === "student") {
            setLoginValues({
                ...loginValues,
                isStudent: true,
                isInstructor: false,
                id: parseInt(formValues.id),
            });
        } else if (formValues.user === "instructor") {
            setLoginValues({
                ...loginValues,
                isStudent: false,
                isInstructor: true,
                id: parseInt(formValues.id),
            });
        }
        console.log("Form values");
        console.log(formValues);
    }, [formValues]);

    // TODO remove later
    // Log LoginValues when it changes
    useEffect(() => {
        console.log("Login Values");
        console.log(loginValues);
    }, [loginValues]);

    function handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setFormValues({ ...formValues, [name]: value });
    }

    function LoginDetails() {
        const handleLogin = () => {
            setUserDetails({
                ...loginValues,
                isLoggedIn: true,
            });
        };

        return (
            <div className="container login-main">
                <div className="login-items">
                    <div>
                        <div className="radio">
                            <input
                                type="radio"
                                name="user"
                                onChange={handleInputChange}
                                value="student"
                                id="student"
                                checked={formValues.user === "student"}
                            />
                            <label for="student">Student</label>
                        </div>
                        <div className="radio">
                            <input
                                type="radio"
                                name="user"
                                onChange={handleInputChange}
                                value="instructor"
                                id="instructor"
                                checked={formValues.user === "instructor"}
                            />
                            <label for="instructor">Instructor</label>
                        </div>
                    </div>
                    <div>
                        <label>
                            <select className="minimal" value={formValues.id} onChange={handleInputChange} name="id" id="userId">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </label>
                    </div>
                </div>
                <button className="login-button" onClick={handleLogin}>Login</button>
            </div>
        );
    }

    return (
        <div>
            {userDetails.isLoggedIn && <App userDetails={userDetails} setUserDetails={setUserDetails} />}
            {!userDetails.isLoggedIn && (
                <Switch>
                    <Route path="/" exact>
                        <LoginDetails />
                    </Route>
                    <Route path="*">
                        <Redirect to="/"></Redirect>
                    </Route>
                </Switch>
            )}
        </div>
    );
}
