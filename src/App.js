import React, { useEffect, useState } from "react";
import SessionList from "./components/SessionList";
import SessionDetails from "./components/SessionDetails";

const App = () => {
    const [currSession, setCurrSession] = useState({});
    const [visible, setVisible] = useState({
        sessionList: true,
        sessionDetails: false,
    });

    useEffect(() => {
        console.log("App effect happening");
        console.log("Visible is " + Object.entries(visible));
        console.log("CurrSession is " + Object.entries(currSession));
    }, [visible, currSession]);

    return (
        <div>
            {visible.sessionList && (
                <SessionList
                    currSession={currSession}
                    setCurrSession={setCurrSession}
                    visible={visible}
                    setVisible={setVisible}
                />
            )}
            {visible.sessionDetails && (
                <SessionDetails currSession={currSession} visible={visible} setVisible={setVisible} />
            )}
            {visible.sessionDetails && (
                <button onClick={() => setVisible({ sessionList: true, sessionDetails: false })}>Back</button>
            )}
        </div>
    );
};

export default App;
