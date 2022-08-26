import { useParams } from "react-router-dom";
import useAxios from "axios-hooks";
import { useState } from "react";
import axios from "../api/axios";

const SetGrade = () => {
    const studentId = useParams().id;
    const subjectID = useParams().subject;
    const teacherID = localStorage.getItem("dataID");

    const [toGrade, setToGrade] = useState({
        subjectID: subjectID,
        computedGrade: 0,
        gradingPeriod: 1,
        teacherID: teacherID,
        remarks: "",
        yearLevel: 0,
    });

    const handleInput = (event) => {
        setToGrade((prevData) => {
            return {
                ...prevData,
                [event.target.name]: event.target.value,
            };
        });

        console.log(toGrade);
    };

    const [
        {
            data: getStudentInformation,
            loading: loadingStudentInformation,
            error: errorStudentInformation,
        },
    ] = useAxios(`http://localhost:3030/get/informations/${studentId}`);

    const [{ data: getSubject, loading: loadingSubject, error: errorSubject }] = useAxios(
        `http://localhost:3030/get/subject/${subjectID}`
    );

    const setGrade = (event) => {
        event.preventDefault();
        axios
            .post(`/set/grade/${getStudentInformation[0].studentID}`, toGrade)
            .then((response) => window.location.replace("/students"));
    };

    return (
        <div className="px-5 py-4 main-interface">
            {loadingStudentInformation ? (
                <div className="d-flex align-items-center">
                    <h2 className="color-primary">Loading...</h2>
                    <div
                        className="spinner-border color-primary ms-auto"
                        role="status"
                        aria-hidden="true"
                    ></div>
                </div>
            ) : (
                <>
                    <h2 className="color-primary">Set Grade</h2>
                    <div className="card p-4">
                        <div className="row">
                            <div className="col">
                                Name: {getStudentInformation[0].first_name}{" "}
                                {getStudentInformation[0].last_name}
                            </div>
                            <div className="col">
                                Subject: {loadingSubject ? "Loading..." : getSubject[0].subjectName}
                            </div>
                        </div>

                        <form className="pt-3" onSubmit={setGrade}>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="computedGrade" className="form-label">
                                        Grade:
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="85"
                                        name="computedGrade"
                                        onChange={handleInput}
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="gradingPeriod" className="mb-2">
                                        Grading:
                                    </label>
                                    <select
                                        name="gradingPeriod"
                                        id="gradingPeriod"
                                        className="form-select"
                                        onChange={handleInput}
                                    >
                                        <option value="1">1st</option>
                                        <option value="2">2nd</option>
                                        <option value="3">3rd</option>
                                        <option value="4">4th</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label htmlFor="yearLevel" className="mb-2">
                                        Year level:
                                    </label>
                                    <select
                                        name="yearLevel"
                                        id="yearLevel"
                                        className="form-select"
                                        onChange={handleInput}
                                    >
                                        <option value="1">7</option>
                                        <option value="2">8</option>
                                        <option value="3">9</option>
                                        <option value="4">10</option>
                                        <option value="5">11</option>
                                        <option value="6">12</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col mt-2 row">
                                    <div className="form-check col">
                                        <input
                                            type="radio"
                                            name="remarks"
                                            id="passed"
                                            value="passed"
                                            onChange={handleInput}
                                        />
                                        <label htmlFor="passed" className="form-check-label ms-2">
                                            Passed
                                        </label>
                                    </div>
                                    <div className="form-check col">
                                        <input
                                            type="radio"
                                            name="remarks"
                                            id="failed"
                                            value="failed"
                                            onChange={handleInput}
                                        />
                                        <label htmlFor="failed" className="form-check-label ms-2">
                                            Failed
                                        </label>
                                    </div>
                                </div>
                                <div className="col">
                                    <button className="btn btnSubmit mt-2">Set</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default SetGrade;
