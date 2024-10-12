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
import Navbar from "./Components/Navbar";

const AppRoutes = () => {
  return (
    <div className="flex min-h-screen">
    {/* Sidebar */}
    <div className="sidebar">
      <SidebarMain />
    </div>

    {/* Main Content Area */}
    <div className="main-content flex-grow ml-72">
      {/* Navbar should be placed inside main-content to span correctly */}
      <Navbar  />
      {/* Content Area */}
      <div className="content p-5 w-full h-[calc(100%-64px)] overflow-auto">
        <Routes>
          <Route path="/student/test" element={<Test_Student />} />
          <Route path="/teacher/test" element={<Test_Teacher />} />
          <Route path="/test/:id" element={<TestDetails />} />
          <Route path="/subjects/:classId" element={<Subjects />} />
          <Route
            path="/student/subjects/:id"
            element={<SubjectDetails_Student />}
          />
          <Route
            path="/teacher/subjects/:id"
            element={<SubjectDetails_Teacher />}
          />
          <Route path="/student/signup" element={<Signup_Student />} />
          <Route path="/teacher/signup" element={<Signup_Teacher />} />
          <Route path="/teacher/login" element={<Login_Teacher />} />
          <Route path="/student/login" element={<Login_Student />} />
        </Routes>
      </div>
    </div>
  </div>
  );
};

function App() {
  // always keep all elements inside router to enable useNavigate()
  return (
    <Router>
      <GlobalProvider>
        <AppRoutes />
      </GlobalProvider>
    </Router>
  );
}

export default App;

