import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TestDetails from "./Components/TestDetails";
import { GlobalProvider } from "./Context/GlobalContext";
import Subjects from "./Components/Subjects";
import Test_Student from "./Student/Test_Student";
import Test_Teacher from "./Teacher/Test_Teacher";
import SubjectDetails_Student from "./Student/SubjectDetails_Student";
import SubjectDetails_Teacher from "./Teacher/SubjectDetails_Teacher";
import Login_Teacher from "./Teacher/Login_Teacher";
import Login_Student from "./Student/Login_Student";
import Signup_Student from "./Student/Signup_Student";
import Signup_Teacher from "./Teacher/Signup_Teacher";
import SidebarMain from "./Components/SidebarMain";
import { Navbar } from "./Components/Navbar.jsx";
import ProtectedRoute from "./ProtectedRoute"; // Import ProtectedRoute
import Attendance_Teacher from "./Teacher/Attendance_Teacher.jsx";
import Attendance_Student from "./Student/Attendance_Student.jsx";

const AppRoutes = () => {
  return (
    <div className="flex min-h-screen">
      <div className="sidebar">
        <SidebarMain />
      </div>

      <div className="main-content flex-grow ml-72">
        <ProtectedRoute>
          <Navbar />
        </ProtectedRoute>
        <div className="content p-5 w-full h-[calc(100%-64px)] overflow-auto">
          <Routes>
            {/* Unprotected Routes */}
            <Route path="/student/login" element={<Login_Student />} />
            <Route path="/teacher/login" element={<Login_Teacher />} />
            <Route path="/student/signup" element={<Signup_Student />} />
            <Route path="/teacher/signup" element={<Signup_Teacher />} />

            {/* Protected Routes */}
            <Route
              path="/student/test"
              element={
                <ProtectedRoute>
                  <Test_Student />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/test"
              element={
                <ProtectedRoute>
                  <Test_Teacher />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/attendance"
              element={
                <ProtectedRoute>
                  <Attendance_Teacher />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/attendance"
              element={
                <ProtectedRoute>
                  <Attendance_Student />
                </ProtectedRoute>
              }
            />
            <Route
              path="/test/:id"
              element={
                <ProtectedRoute>
                  <TestDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subjects/:classId"
              element={
                <ProtectedRoute>
                  <Subjects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/subjects/:id"
              element={
                <ProtectedRoute>
                  <SubjectDetails_Student />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/subjects/:id"
              element={
                <ProtectedRoute>
                  <SubjectDetails_Teacher />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <GlobalProvider>
        <AppRoutes />
      </GlobalProvider>
    </Router>
  );
}

export default App;
