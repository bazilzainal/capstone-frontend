import React, { useEffect, useState } from "react";
import App from "./App";
import { Route, Switch, Redirect } from "react-router-dom";

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

    // Add userDetails to localStorage when value changes
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
            <div>
                <div>
                    <div className="radio">
                        <label>
                            <input
                                type="radio"
                                name="user"
                                onChange={handleInputChange}
                                value="student"
                                checked={formValues.user === "student"}
                            />
                            Student
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input
                                type="radio"
                                name="user"
                                onChange={handleInputChange}
                                value="instructor"
                                checked={formValues.user === "instructor"}
                            />
                            Instructor
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            ID
                            <select value={formValues.id} onChange={handleInputChange} name="id" id="userId">
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </label>
                    </div>
                </div>
                <button onClick={handleLogin}>Login</button>
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
