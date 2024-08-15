import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Test from "./Components/Test";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Sidebar from "./Components/Sidebar";
import TestDetails from "./Components/TestDetails";
import { GlobalProvider } from "./Context/GlobalContext";

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
          <Route path="/test" element={<Test />} />
          <Route path="/test/:id" element={<TestDetails />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {            // always keep all elements inside router to enable useNavigate()
  return (
    <Router>
      <GlobalProvider>     
        <AppRoutes />
      </GlobalProvider>
    </Router>
  );
}

export default App;
