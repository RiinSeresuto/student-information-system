import { useState } from "react";
import "../styles/form.css";
import axios from "../api/axios";
import useAxios from "axios-hooks";

const AddStudent = () => {
    const [datum, setData] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        password: "",
        email: "",
        schoolID: "",
        role: "",
    });

    const handleInput = (event) => {
        setData((prevData) => {
            return {
                ...prevData,
                [event.target.name]: event.target.value,
            };
        });
    };

    const saveClicked = (event) => {
        event.preventDefault();
        axios.post("/post/new-person", datum).then((response) => {
            if (response.data === true) {
                axios
                    .get(`http://localhost:3030/get/user/${datum.role}/${datum.schoolID}`)
                    .then((res) => {
                        setInformation(res.data[0].id);
                    });
                console.log("Data saved");
            } else {
                console.log("Data not saved");
            }
        });
    };

    const setInformation = (data) => {
        axios.post(`/post/information/${data}`, datum).then((response) => {
            if (response.data === true) {
                console.log("Information saved");
            } else {
                console.log(response);
            }
        });
    };

    return (
        <div className="px-5 py-4 main-interface">
            <h2 className="color-primary">Add</h2>

            <div className="card p-4">
                <form onSubmit={saveClicked}>
                    <div className="form-floating">
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            className="form-control"
                            placeholder="John Doe"
                            onChange={handleInput}
                            required
                        />
                        <label htmlFor="firstName">First Name</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            className="form-control"
                            placeholder="John Doe"
                            onChange={handleInput}
                            required
                        />
                        <label htmlFor="lastName">Last Name</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="text"
                            name="middleName"
                            id="middleName"
                            className="form-control"
                            placeholder="John Doe"
                            onChange={handleInput}
                        />
                        <label htmlFor="middleName">Middle Name</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            placeholder="password"
                            onChange={handleInput}
                            required
                        />
                        <label htmlFor="password">Temporary Password</label>
                    </div>
                    <div className="row">
                        <div className="form-floating col">
                            <input
                                type="text"
                                name="email"
                                id="email"
                                className="form-control"
                                placeholder="email"
                                onChange={handleInput}
                                required
                            />
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="form-floating col">
                            <input
                                type="text"
                                name="schoolID"
                                id="schoolID"
                                className="form-control"
                                placeholder="schoolID"
                                onChange={handleInput}
                                required
                            />
                            <label htmlFor="email">School ID</label>
                        </div>
                    </div>
                    <div className="role mt-4 d-flex">
                        <div className="ps-3">Role: </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="role"
                                id="admin"
                                value="Admin"
                                onChange={handleInput}
                                required
                            />
                            <label htmlFor="admin">Admin</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="role"
                                id="student"
                                value="Student"
                                onChange={handleInput}
                                required
                            />
                            <label htmlFor="student">Student</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="role"
                                id="teacher"
                                value="Teacher"
                                onChange={handleInput}
                                required
                            />
                            <label htmlFor="teacher">Teacher</label>
                        </div>
                    </div>

                    <button className="btn btnSubmit mt-4">Save</button>
                </form>
            </div>
        </div>
    );
};

export default AddStudent;
