import { useParams } from "react-router-dom";
import useAxios from "axios-hooks";
import { useState, useRef } from "react";
import axios from "../api/axios";

const AssignStudent = () => {
    const userId = useParams().id;
    const [section, setSection] = useState();
    const [subject, setSubject] = useState();
    const [teacher, setTeacher] = useState();

    const [{ data: getStudent, loading: loadingStudent, error: errorStudent }] = useAxios(
        `http://localhost:3030/get/student/${userId}`
    );

    const [{ data: getSection, loading: loadingSection, error: errorSection }] = useAxios(
        "http://localhost:3030/get/sections"
    );

    const [{ data: getSubjects, loading: loadingSubjects, error: errorSubjects }] = useAxios(
        "http://localhost:3030/get/subjects"
    );

    const [{ data: getTeachers, loading: loadingTeachers, error: errorTeachers }] = useAxios(
        "http://localhost:3030/get/teachers"
    );

    const [
        {
            data: getAssignedSubjects,
            loading: loadingAssignedSubjects,
            error: errorAssignedSubjects,
        },
    ] = useAxios(`http://localhost:3030/get/assigned-subjects/${userId}`);

    const changeSection = (e, event) => {
        e.preventDefault();

        axios.post("/post/section", { id: userId, section: section }).then((res) => {
            if (res.data === false) {
                alert("Data not save: retry");
            } else {
                location.reload(true);
            }
        });
    };

    const addSubject = (event) => {
        event.preventDefault();

        axios
            .post("/add/subject", { studentID: userId, subjectID: subject, teacherID: teacher })
            .then((res) => {
                if (res.data === false) {
                    alert("Data not save: retry");
                } else {
                    location.reload(true);
                }
            });
    };

    const idRef = useRef(null);

    const deleteSubject = (event, id) => {
        event.preventDefault();

        axios.get(`/delete/assigned-subject/${id}`).then((res) => {
            if (res.data === false) {
                alert("Data not deleted: retry");
            } else {
                location.reload(true);
            }
        });
    };

    return (
        <div className="px-5 py-4 main-interface">
            {loadingStudent ? (
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
                    <h2 className="color-primary">
                        Assigning: {getStudent[0].first_name} {getStudent[0].last_name}
                    </h2>

                    <form onSubmit={changeSection}>
                        <div className="row">
                            <div className="col">
                                <h4>Section: {getStudent[0].section_name}</h4>
                            </div>
                            <div className="col">
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    onChange={(e) => setSection(e.target.value)}
                                >
                                    <option defaultValue={true}>Change Section</option>
                                    {loadingSection ? (
                                        <option>Loading sections</option>
                                    ) : (
                                        getSection.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>
                                                    {item.section_name}
                                                </option>
                                            );
                                        })
                                    )}
                                </select>
                            </div>
                            <div className="col">
                                <button className="btn btnSubmit">Change</button>
                            </div>
                        </div>
                    </form>
                    <div className="row mt-3">
                        <div className="col">
                            Subjects
                            {loadingAssignedSubjects ? (
                                <div>Loading Assigned Subjects</div>
                            ) : (
                                getAssignedSubjects.map((item, index) => {
                                    return (
                                        <div className="row mt-3" key={index}>
                                            <form
                                                onSubmit={(event) => deleteSubject(event, item.id)}
                                            >
                                                <div className="row align-items-center">
                                                    <div className="col d-block">
                                                        {item.subjectName}
                                                    </div>
                                                    <div className="col d-block">
                                                        {item.first_name} {item.last_name}
                                                    </div>
                                                    <button className="col btn btnSubmit">
                                                        <i className="bi bi-trash"></i> Remove
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                        <div className="col">
                            <form onSubmit={addSubject}>
                                Add Subjects
                                <div className="row">
                                    <div className="col">
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            onChange={(e) => setSubject(e.target.value)}
                                        >
                                            <option defaultValue>Select Subject</option>
                                            {loadingSubjects ? (
                                                <option>Loading subjects</option>
                                            ) : (
                                                getSubjects.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.id}>
                                                            {item.subjectName}
                                                        </option>
                                                    );
                                                })
                                            )}
                                        </select>
                                    </div>
                                    <div className="col">
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            onChange={(e) => setTeacher(e.target.value)}
                                        >
                                            <option defaultValue>Select Teacher</option>
                                            {loadingTeachers ? (
                                                <option>Loading Teachers</option>
                                            ) : (
                                                getTeachers.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.id}>
                                                            {item.first_name} {item.last_name}
                                                        </option>
                                                    );
                                                })
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col mt-3">
                                        <button className="btn btnSubmit">Add</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AssignStudent;
