import { Nsidebar, SidebarItem } from "./nsidebar";
import { GiBookPile } from "react-icons/gi";
import { LuLayoutDashboard } from "react-icons/lu";
import { SiSpeedtest } from "react-icons/si";
import { FiBookOpen } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Context/GlobalContext";
import axiosInstance from "../axiosInstance";
//90A28D
const SidebarMain = () => {
  const [activeItem, setActiveItem] = useState("");
  const navigate = useNavigate();
  const { role } = useGlobalContext();
  const classId = localStorage.getItem("classId");

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/students/logout");
      console.log("User logged out");

      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("role");
      localStorage.removeItem("classId");
      navigate(role == "student" ? "/student/login" : "/teacher/login");
    } catch (error) {
      console.log("Error logging out", error);
    }
  };

  return (
    <Nsidebar>
      <SidebarItem
        icon={<LuLayoutDashboard size={20} />}
        text={"Dashboard"}
        alert
        active={activeItem === "Dashboard"}
        onClick={() => setActiveItem("Dashboard")}
      />
      <SidebarItem
        icon={<GiBookPile size={20} />}
        text={"Attendance"}
        active={activeItem === "Attendance"}
        onClick={() => {
          setActiveItem("Attendance");
          navigate(
            role == "student" ? "/student/attendance" : "/teacher/attendance"
          );
        }}
      />
      {role == "teacher" && (
        <SidebarItem
          icon={<GiBookPile size={20} />}
          text={"Attendance History"}
          active={activeItem === "Attendance History"}
          onClick={() => {
            setActiveItem("Attendance History");
            navigate("/teacher/attendance-history");
          }}
        />
      )}
      <SidebarItem
        icon={<FiBookOpen size={20} />}
        text={"Subjects"}
        active={activeItem === "Subjects"}
        onClick={() => {
          setActiveItem("Subjects");
          navigate(`/subjects/${classId}`);
        }}
      />
      <SidebarItem
        icon={<SiSpeedtest size={20} />}
        text={"Tests"}
        active={activeItem === "Tests"}
        onClick={() => {
          setActiveItem("Tests");
          navigate(role == "student" ? "/student/test" : "/teacher/test");
        }}
      />
      <SidebarItem
        icon={<FiBookOpen size={20} />}
        text={"Logout"}
        active={activeItem === "Logout"}
        onClick={() => {
          setActiveItem("Logout");
          navigate(role == "student" ? "/student/login" : "/teacher/login");
          handleLogout();
        }}
      />
    </Nsidebar>
  );
};

export default SidebarMain;
