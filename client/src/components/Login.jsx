import { useState } from "react";
import axios from "../api/axios";
import ViteLogo from "../assets/vite.svg";
import Illustration from "../assets/undraw_education_f8ru.svg";

const formStyles = {
    maxWidth: "400px",
    width: "100%",
    position: "absolute",
    top: "50%",
    left: "70%",
    transform: "translate(-50%, -50%)",
};

const illustrationStyles = {
    position: "absolute",
    top: "50%",
    left: "30%",
    transform: "translate(-50%, -50%)",
};

const Signin = () => {
    const [loginData, setLoginData] = useState({ password: "", email: "", role: "" });

    const handleInput = (event) => {
        setLoginData((prevData) => {
            return {
                ...prevData,
                [event.target.name]: event.target.value,
            };
        });
    };

    const [alert, setAlert] = useState(false);

    const onLoginClick = (event) => {
        event.preventDefault();

        axios
            .post("/login", loginData)
            .then((response) => {
                console.log("Log from Login.jsx: " + response.data);

                if (response.data === false) {
                    localStorage.clear();
                    localStorage.setItem("login", false);

                    setAlert(true);
                } else {
                    localStorage.clear();
                    localStorage.setItem("login", true);
                    localStorage.setItem("role", response.data[0].roles);
                    localStorage.setItem("id", response.data[0].id);
                    localStorage.setItem("first_name", response.data[0].first_name);
                    localStorage.setItem("last_name", response.data[0].last_name);
                    localStorage.setItem("id-code", response.data[0].codeID);

                    response.data[0].dataID &&
                        localStorage.setItem("dataID", response.data[0].dataID);

                    location.reload(true);
                }
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <div className="illustration">
                <img
                    src={Illustration}
                    alt="Sign in illustration"
                    width="400px"
                    style={illustrationStyles}
                />
            </div>
            <div className="text-center" style={formStyles}>
                <div className="d-flex flex-column align-items-center justify-content-center mb-5">
                    <img src={ViteLogo} alt="logo" width="25px" />
                    <p className="text-uppercase m-0 fs-5">Vite International School</p>
                </div>
                <div className="card">
                    {alert && (
                        <div
                            className="alert alert-danger alert-dismissible fade show"
                            role="alert"
                        >
                            <strong>Login Denied!</strong>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="alert"
                                aria-label="Close"
                                onClick={() => setAlert(false)}
                            ></button>
                        </div>
                    )}
                    <div className="card-body">
                        <h2>Log in</h2>
                        <form onSubmit={onLoginClick}>
                            <div className="role mt-3 d-flex justify-content-between">
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        name="role"
                                        id="admin"
                                        value="administrator"
                                        checked={loginData.role === "administrator"}
                                        onChange={handleInput}
                                        required
                                    />
                                    <label htmlFor="admin" className="ms-2">
                                        Admin
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        name="role"
                                        id="student"
                                        value="students"
                                        checked={loginData.role === "students"}
                                        onChange={handleInput}
                                        required
                                    />
                                    <label htmlFor="student" className="ms-2">
                                        Student
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        name="role"
                                        id="teacher"
                                        value="teachers"
                                        checked={loginData.role === "teachers"}
                                        onChange={handleInput}
                                        required
                                    />
                                    <label htmlFor="teacher" className="ms-2">
                                        Teacher
                                    </label>
                                </div>
                            </div>

                            <div className="form-floating">
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="user"
                                    value={loginData.email}
                                    onChange={handleInput}
                                />
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                            </div>

                            <div className="form-floating">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="password"
                                    value={loginData.password}
                                    onChange={handleInput}
                                />
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                            </div>

                            <button className="btn mt-3 btnSubmit">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signin;
