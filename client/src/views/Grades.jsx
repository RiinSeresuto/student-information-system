import { useState } from "react";
import useAxios from "axios-hooks";

const Grades = () => {
    const [filters, setFilters] = useState({ year: 0, period: 0 });

    const [{ data, loading, error }, refetch] = useAxios(
        `http://localhost:3030/get/computed-grades/${localStorage.getItem("dataID")}/${
            filters.year
        }/${filters.period}`
    );

    var grades;

    if (loading === false) {
        if (data.length > 0) {
            grades = data.map((item) => item.computedGrade);
            grades = grades.reduce((acc, cur) => acc + cur) / grades.length;
        }
    }

    const handleInput = (event) => {
        setFilters((prevData) => {
            return {
                ...prevData,
                [event.target.name]: event.target.value,
            };
        });
    };

    return (
        <>
            <div className="px-5 py-4 main-interface">
                <div className="heading justify-content-between align-items-center">
                    <div className="row">
                        <div className="col-4">
                            <h2 className="color-primary">Grades</h2>
                        </div>
                        <div className="col">
                            <form className="form">
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="yearSelect" className="form-label">
                                            Select Year:
                                        </label>
                                        <select
                                            name="year"
                                            className="form-select-sm ms-2"
                                            onChange={handleInput}
                                        >
                                            <option>Select Year</option>
                                            <option value="1">Seven</option>
                                            <option value="2">Eight</option>
                                            <option value="3">Nine</option>
                                            <option value="4">Ten</option>
                                            <option value="5">Eleven</option>
                                            <option value="6">Twelve</option>
                                        </select>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="yearSelect" className="form-label">
                                            Grading Period:
                                        </label>
                                        <select
                                            name="period"
                                            className="form-select-sm ms-2"
                                            onChange={handleInput}
                                        >
                                            <option>Select Grading Period</option>
                                            <option value="1">1st</option>
                                            <option value="2">2nd</option>
                                            <option value="3">3rd</option>
                                            <option value="4">4th</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th scope="col">Subject</th>
                            <th scope="col">Code</th>
                            <th scope="col">Grade</th>
                            <th scope="col">Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4}>Loading</td>
                            </tr>
                        ) : (
                            <>
                                {data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.subjectName}</td>
                                            <td>{item.subjectCode}</td>
                                            <td>{item.computedGrade}</td>
                                            <td>{item.remark}</td>
                                        </tr>
                                    );
                                })}
                            </>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={2}>
                                <strong>Average</strong>
                            </td>
                            <td>
                                <strong>{grades && grades.toFixed(2)}</strong>
                            </td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    );
};

export default Grades;
