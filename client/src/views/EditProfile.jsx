import { useState } from "react";
import "../styles/form.css";
import axios from "../api/axios";

const EditProfile = () => {
    const [editData, setEditData] = useState({
        fistName: "",
        middleName: "",
        lastName: "",
        birthplace: "",
        birthdate: "",
        address: "",
        phone: "",
        sex: "",
        newPassword: "",
        oldPassword: "",
        role: localStorage.getItem("role"),
        codeID: localStorage.getItem("id-code"),
    });

    const handleInput = (event) => {
        setEditData((prevData) => {
            return {
                ...prevData,
                [event.target.name]: event.target.value,
            };
        });
    };

    const [alert, setAlert] = useState(false);

    const editClicked = (event) => {
        event.preventDefault();
        axios.post(`/edit/information/${localStorage.getItem("id")}`, editData).then((response) => {
            if (response.data === false) {
                setAlert(true);
            } else {
                localStorage.clear();
                window.location.replace("/");
            }
            console.log(response.data);
        });
    };

    return (
        <div className="px-5 py-4 main-interface">
            <h2 className="color-primary">Edit Profile</h2>
            {alert && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Incorrect old password!</strong>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                    ></button>
                </div>
            )}
            <div className="card mt-5 p-4">
                <form onSubmit={editClicked}>
                    <div className="form-floating">
                        <input
                            type="text"
                            name="fistName"
                            id="fistName"
                            className="form-control"
                            placeholder="John Doe"
                            onChange={handleInput}
                            required
                        />
                        <label htmlFor="fistName">First Name</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="text"
                            name="middleName"
                            id="middleName"
                            className="form-control"
                            placeholder="John Doe"
                            onChange={handleInput}
                            required
                        />
                        <label htmlFor="middleName">Middle Name</label>
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
                    <div className="d-flex row">
                        <div className="form-floating col">
                            <input
                                type="text"
                                name="birthplace"
                                id="birthplace"
                                className="form-control"
                                placeholder="John Doe"
                                onChange={handleInput}
                                required
                            />
                            <label htmlFor="birthplace">Birthplace</label>
                        </div>
                        <div className="form-floating col">
                            <input
                                type="date"
                                name="birthdate"
                                id="birthdate"
                                className="form-control"
                                placeholder="John Doe"
                                onChange={handleInput}
                                required
                            />
                            <label htmlFor="birthdate">Birthdate</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-floating col">
                            <input
                                type="text"
                                name="address"
                                id="address"
                                className="form-control"
                                placeholder="John Doe"
                                onChange={handleInput}
                                required
                            />
                            <label htmlFor="address">Address</label>
                        </div>
                        <div className="form-floating col">
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                className="form-control"
                                placeholder="John Doe"
                                onChange={handleInput}
                                required
                            />
                            <label htmlFor="phone">Phone Number</label>
                        </div>
                    </div>
                    <div className="gender mt-4 d-flex">
                        <div className="ps-3">Sex: </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="sex"
                                id="male"
                                value="Male"
                                onChange={handleInput}
                                required
                            />
                            <label htmlFor="male" className="ms-2">
                                Male
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="sex"
                                id="female"
                                value="Female"
                                onChange={handleInput}
                                required
                            />
                            <label htmlFor="female" className="ms-2">
                                Female
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-floating col">
                            <input
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                className="form-control"
                                placeholder="John Doe"
                                onChange={handleInput}
                                required
                            />
                            <label htmlFor="newPassword">New Password</label>
                        </div>
                        <div className="form-floating ms-4 col">
                            <input
                                type="password"
                                name="oldPassword"
                                id="oldPassword"
                                className="form-control"
                                placeholder="John Doe"
                                onChange={handleInput}
                                required
                            />
                            <label htmlFor="oldPassword">Old Password</label>
                        </div>
                    </div>
                    <button className="btn btnSubmit mt-4">Save</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
