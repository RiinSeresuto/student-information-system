import useAxios from "axios-hooks";
import { Link } from "react-router-dom";

const Students = () => {
    const id = localStorage.getItem("dataID");

    const [{ data, loading, error }] = useAxios(`http://localhost:3030/get/subject/students/${id}`);

    return (
        <div className="px-5 py-4 main-interface">
            <h2 className="color-primary">My Students</h2>
            <table className="mt-4 table">
                <thead>
                    <tr>
                        <th scope="col">Student</th>
                        <th scope="col">Section</th>
                        <th scope="col">Subjects</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={5}>
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        data.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        {item.first_name} {item.last_name}
                                    </td>
                                    <td>{item.section_name}</td>
                                    <td>{item.subjectName}</td>
                                    <td>Year {item.grade_level}</td>
                                    <td>
                                        <Link
                                            to={`/students/set-grade/${item.informationID}/${item.subjectID}`}
                                        >
                                            Set Grade
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Students;
