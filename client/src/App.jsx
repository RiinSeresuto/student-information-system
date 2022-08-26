import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
    const [login, setLogin] = useState(false);

    useState(() => {
        if (localStorage.getItem("login") === "true") {
            setLogin(true);
            //console.log("log from App.jsx: " + login);
        }
    }, []);

    return <>{login ? <Dashboard /> : <Login />}</>;
}

export default App;
