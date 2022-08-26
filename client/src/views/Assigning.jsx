import { Link } from "react-router-dom";
import useAxios from "axios-hooks";

const Assigning = () => {
    const [{ data, loading, error }, refetch] = useAxios("http://localhost:3030/get/students");

    return (
        <div className="px-5 py-4 main-interface">
            {loading ? (
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
                    <h2 className="color-primary">Assigning</h2>
                    <div className="card p-4">
                        <div className="mt-4 ">
                            <div className="row mb-2">
                                <div className="col"><strong>Student</strong></div>
                                <div className="col"><strong>Section</strong></div>
                                <div className="col"><strong>Assign</strong></div>
                            </div>

                            {data &&
                                data.map((item, index) => {
                                    return (
                                        <form className="my-3" key={index}>
                                            <div className="row">
                                                <div className="col">
                                                    {item.first_name} {item.last_name}
                                                </div>
                                                <div className="col">{item.section_name}</div>
                                                <div className="col">
                                                    <Link to={`/assigning/${item.id}`}>Assign</Link>
                                                </div>
                                            </div>
                                        </form>
                                    );
                                })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Assigning;
