import { Link } from "react-router-dom";
import ViteLogo from "../assets/vite.svg";

const Sidebar = () => {
    const role = localStorage.getItem("role");

    var menu = [];

    const studentMenu = [
        { id: "1", icon: "bi bi-speedometer2", label: "Dashboard", link: "/" },
        { id: "2", icon: "bi bi-person", label: "Profile", link: "/profile" },
        { id: "3", icon: "bi bi-book", label: "Subjects", link: "/subjects" },
        {
            id: "4",
            icon: "bi bi-layout-text-window",
            label: "Grades",
            link: "/grades",
        },
    ];

    const teacherMenu = [
        { id: "1", icon: "bi bi-speedometer2", label: "Dashboard", link: "/" },
        { id: "2", icon: "bi bi-person", label: "Profile", link: "/profile" },
        { id: "3", icon: "bi bi-people", label: "Students", link: "/students" },
    ];

    const adminMenu = [
        { id: "1", icon: "bi bi-speedometer2", label: "Dashboard", link: "/" },
        { id: "2", icon: "bi bi-person", label: "Profile", link: "/profile" },
        { id: "3", icon: "bi bi-people", label: "Students", link: "/students" },
        { id: "4", icon: "bi bi-person-plus", label: "Add Person", link: "/add" },
        {
            id: "5",
            icon: "bi bi-person-check",
            label: "Student Assignment",
            link: "/assigning",
        },
    ];

    if (role == "Admin" || role == "admin") {
        menu = adminMenu;
    } else if (role == "Student" || role == "student") {
        menu = studentMenu;
    } else if (role == "Teacher" || "teacher") {
        menu = teacherMenu;
    }

    const logout = () => {
        localStorage.clear();
        window.location.replace("/");
    };

    return (
        <div id="sidebar" className="d-block vh-100 border-end position-relative">
            <div className="sidebar-content position-fixed">
                <div id="sidebar--brand" className="d-flex p-3">
                    <img src={ViteLogo} alt="Vite Logo" />
                    <h5 className="ms-3 color-primary">
                        Vite International <br /> High School
                    </h5>
                </div>

                <ul className="nav flex-column mt-5">
                    {menu.map((item) => (
                        <Link to={item.link} key={item.id} className="nav-item py-2 px-3 d-flex">
                            <i className={item.icon}></i> <p className="fs-5 m-0">{item.label}</p>
                        </Link>
                    ))}
                </ul>

                <button onClick={logout} className="btn mt-3 btnSubmit d-block mx-auto">
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
