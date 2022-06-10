import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./pages/Login";
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>

        {/* Using HashRouter to ensure browser history is preserved properly in production */}
        {/* There are probably better ways but that's for future exploration */}
        <HashRouter>
            <Login />
        </HashRouter>
    </React.StrictMode>
);
