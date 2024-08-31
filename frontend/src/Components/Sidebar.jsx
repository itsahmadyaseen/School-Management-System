import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { useGlobalContext } from "../Context/GlobalContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { role, userDetails, fetchUsers } = useGlobalContext();
  const [classId, setClassId] = useState("");

  useEffect(() => {
    fetchUsers();
    setClassId(userDetails.class)
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/students/logout");
      console.log("User logged out");

      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      navigate(role == "student" ? "/student/login" : "/teacher/login");
    } catch (error) {
      console.log("Error logging out", error);
    }
  };

  return (
    <div className="h-screen w-64  text-white  fixed  p-6 text-lg">
      <div className="text-center  mb-8">
        <h1 className="text-2xl font-bold">SMS</h1>
        <h1 className="mt-2"></h1>
      </div>
      <ul>
        <li className="mb-3 p-1 hover:border rounded-md  hover:bg-cyan-700">
          <Link to="/" className="">
            Home
          </Link>
        </li>
        <li className="mb-3 p-1 hover:border rounded-md   hover:bg-cyan-700">
          <Link
            to={role == "student" ? "/student/test" : "/teacher/test"}
            className=""
          >
            Test
          </Link>
        </li>
        <li className="mb-3 p-1 hover:border rounded-md   hover:bg-cyan-700">
          <Link to={`/subjects/${classId}`} className="">
            Subjects
          </Link>
        </li>
        {/* <li className="mb-3 p-1 hover:border rounded-sm border-black  hover:bg-purple-700">
          <Link to="/admin/manage-books" className="">
            Books Details
          </Link>
        </li>
        <li className="mb-3 p-1 hover:border rounded-sm border-black  hover:bg-purple-700">
          <Link to="/admin/add-book" className="">
            Add Book
          </Link>
        </li>
        <li className="mb-3 p-1 hover:border rounded-sm border-blac  hover:bg-purple-700">
          <Link to="/admin/borrow" className="">
            Borrow
          </Link>
        </li>
        <li className="mb-3 p-1 hover:border rounded-sm border-black  hover:bg-purple-700">
          <Link to="/admin/get-member" className="">
            Get Member
          </Link>
        </li>
        
        <li className="mb-3 p-1 hover:border rounded-sm border-black  hover:bg-purple-700">
          <Link to="/admin/return" className="">
            Return
          </Link>
        </li> */}
        <li
          onClick={() => handleLogout()}
          className="mb-3 p-1 cursor-pointer hover:border rounded-md   hover:bg-cyan-700"
        >
          Log out
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
