import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import MainDashboard from "../views/MainDashboard";
import Profile from "../views/Profile";
import Grades from "../views/Grades";
import Navbar from "../components/Navbar";
import Students from "../views/Students";
import EditGrade from "../views/EditGrade";
import Add from "../views/Add";
import EditProfile from "../views/EditProfile";
import Assigning from "../views/Assigning";
import AssignStudent from "../views/AssignStudent";
import Subjects from "../views/Subjects";
import SetGrade from "../views/SetGrade";

const Dashboard = () => {
    return (
        <div className="d-flex w-100 justify-content-between">
            <Sidebar />
            <div id="interface" className="">
                <Navbar />
                <Routes>
                    <Route path="/" element={<MainDashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/grades" element={<Grades />} />
                    <Route path="/students" element={<Students />} />
                    <Route path="/students/set-grade/:id/:subject" element={<SetGrade />} />
                    <Route path="/edit-grade" element={<EditGrade />} />
                    <Route path="/add" element={<Add />} />
                    <Route path="/assigning" element={<Assigning />} />
                    <Route path="/assigning/:id" element={<AssignStudent />} />
                    <Route path="/profile/edit" element={<EditProfile />} />
                    <Route path="/subjects" element={<Subjects />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;
