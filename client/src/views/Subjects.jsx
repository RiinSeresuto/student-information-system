import useAxios from "axios-hooks";

const Subjects = () => {
    const id = localStorage.getItem("dataID");

    const [{ data, loading, error }, refetch] = useAxios(
        `http://localhost:3030/get/assigned-subjects/${id}`
    );

    return (
        <div className="px-5 py-4 main-interface">
            <h2 className="color-primary">Subjects</h2>

            <div className="card p-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Subject Code</th>
                            <th scope="col">Subject Name</th>
                            <th scope="col">Subject Teacher</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.subjectCode}</td>
                                        <td>{item.subjectName}</td>
                                        <td>
                                            {item.first_name} {item.last_name}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Subjects;
