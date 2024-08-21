import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./Components/Signup";
import Sidebar from "./Components/Sidebar";
import TestDetails from "./Components/TestDetails";
import { GlobalProvider } from "./Context/GlobalContext";
import Subjects from "./Components/Subjects";
import Test_Student from "./Student/Test_Student";
import Test_Teacher from "./Teacher/Test_Teacher";
import SubjectDetails_Student from "./Student/SubjectDetails_Student";
import SubjectDetails_Teacher from "./Teacher/SubjectDetails_Teacher";
import Login_Teacher from "./Teacher/Login_Teacher";
import Login_Student from "./Student/Login_Student";

const AppRoutes = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar should take a fixed width */}
      <div className="w-64 bg-cyan-900">
        <Sidebar />
      </div>
      {/* Main content area should take the remaining width */}
      <div className="flex-grow">
        <Routes>
          <Route path="/student/test" element={<Test_Student />} />
          <Route path="/teacher/test" element={<Test_Teacher />} />
          <Route path="/test/:id" element={<TestDetails />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/student/subjects/:id" element={<SubjectDetails_Student />} />
          <Route path="/teacher/subjects/:id" element={<SubjectDetails_Teacher />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/teacher/login" element={<Login_Teacher />} />
          <Route path="/student/login" element={<Login_Student />} />
        </Routes>
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
