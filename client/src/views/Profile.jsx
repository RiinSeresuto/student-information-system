import { Link } from "react-router-dom";
import useAxios from "axios-hooks";

const Profile = () => {
    const id = localStorage.getItem("id").toLocaleLowerCase();

    const [{ data, loading, error }, refetch] = useAxios(
        `http://localhost:3030/get/informations/${id}`
    );

    return (
        <div>
            <div className="px-5 py-4 main-interface">
                <h2 className="color-primary">Profile</h2>
                <div className="d-flex">
                    <div className="card p-4 profile-image-card d-flex justify-content-center align-items-center">
                        <div className="card-content">
                            <img
                                className="profile-image d-block mx-auto"
                                src="https://i.pravatar.cc/100?img=4"
                            />
                            <h4 className="m-0">
                                {data && data[0].first_name.split(" ")[0]}{" "}
                                {data && data[0].last_name}
                            </h4>
                            {localStorage.getItem("role") == "Student" ? (
                                <>
                                    <p className="m-0">Grade: 7</p>
                                    <p className="m-0">Section: Apple</p>
                                </>
                            ) : (
                                <></>
                            )}

                            <hr />
                            <p className="m-0">
                                {localStorage.getItem("role")} ID: {localStorage.getItem("id-code")}
                            </p>
                        </div>
                    </div>

                    <div className="card profile-info-card ms-5 w-100 p-4">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td className="fw-bold border border-0">Full Name</td>
                                </tr>
                                <tr className="border-bottom">
                                    <td>
                                        {data && data[0].first_name} {data && data[0].middle_name}{" "}
                                        {data && data[0].last_name}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="pt-4 fw-bold border-0">Phone Number</td>
                                </tr>
                                <tr className="border-bottom">
                                    <td>{data && data[0].phone}</td>
                                </tr>
                                <tr>
                                    <td className="pt-4 fw-bold border-0">Address</td>
                                </tr>
                                <tr className="border-bottom">
                                    <td>{data && data[0].address}</td>
                                </tr>
                                <tr>
                                    <td className="pt-4 fw-bold border-0">Birthdate</td>
                                </tr>
                                <tr className="border-bottom">
                                    <td>{data && data[0].birthdate}</td>
                                </tr>
                                <tr>
                                    <td className="pt-4 fw-bold border-0">Birtplace</td>
                                </tr>
                                <tr className="border-bottom">
                                    <td>{data && data[0].birthplace}</td>
                                </tr>
                            </tbody>
                        </table>

                        <Link to="/profile/edit" className="btn btnSubmit">
                            Edit
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
