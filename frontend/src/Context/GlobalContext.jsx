/* eslint-disable react/prop-types */
import { createContext, useCallback, useContext, useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("id");

  const [userDetails, setUserDetails] = useState([]);
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  // const [questions, setQuestions] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alreadySubmittedError, setAlreadySubmittedError] = useState(null);
  const [result, setResult] = useState([]);
  const [notGivenExam, setNotGivenExam] = useState(false);

  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    try {
      // console.log(id);

      const response =
        role == "teacher"
          ? await axiosInstance.post("/teachers/teacher", { id })
          : await axiosInstance.post("/students/student", { id });

      // console.log(response.data);
      setUserDetails(response.data.data);
    } catch (error) {
      console.log("Error fetching user details", error);
    }
  }, []);

  const fetchTests = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/tests/get");
      setTests(response.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSelectedTest = async (id) => {
    try {
      const response = await axiosInstance.get(`/tests/get/${id}`);
      // console.log(response.data.data);

      setSelectedTest(response.data.data);
      setLoading(false);
    } catch (error) {
      // console.log('error response', error.response);

      if (error.response && error.response.status === 403) {
        setAlreadySubmittedError(true);
      } else {
        setError(error.message);
      }
      setLoading(false);
    }
  };

  const submitResponse = async (id, answers) => {
    try {
      console.log(answers, "answers");

      await axiosInstance.post(`/results/submit-response`, {
        testId: id,
        answers,
      });
      navigate("/student/test");

      // console.log(response.data);
    } catch (error) {
      console.error("Error submitting test:", error);
      // console.log("error", error.response.status);

      setError(error.message);
      setLoading(false);
    }
  };

  // SUBJECT --

  const fetchSubjects = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(`/subjects/get-subjects`);
      setSubjects(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSelectedSubject = useCallback(async (id) => {
    try {
      const response = await axiosInstance.get(`/subjects/get/${id}`);
      // console.log("response subject", response.data.data);

      setSelectedSubject(response.data.data);
      setLoading(false);
    } catch (error) {
      // console.log('error response', error.response);

      setError(error.message);
      setLoading(false);
    }
  }, []);

  // QUESTIONS

  const addQuestions = async (id, body, options, marks, answer, classId) => {
    try {
      // console.log("inside", id);

      await axiosInstance.post(`/questions/create/${id}`, {
        body,
        options,
        marks,
        answer,
        classId,
      });

      setAlert({
        show: true,
        type: "success",
        message: "Question added successfully!",
      });

      fetchSelectedSubject(id);
    } catch (error) {
      setAlert({
        show: true,
        type: "error",
        message: "Error adding question. Please try again.",
      });

      console.log("Error adding question", error);
    }
  };

  const deleteQuestion = async (id, questionId) => {
    try {
      console.log("inside", questionId);

      await axiosInstance.delete(`/questions/delete`, {
        params: { questionId },
      });

      setAlert({
        show: true,
        type: "success",
        message: "Question deleted successfully!",
      });
      setTimeout(() => {
        setAlert({ show: false, type: "", message: "" });
      }, 2000);

      fetchSelectedSubject(id);
      console.log("deketed");
    } catch (error) {
      setAlert({
        show: true,
        type: "error",
        message: "Error deleting question. Please try again.",
      });

      setTimeout(() => {
        setAlert({ show: false, type: "", message: "" });
      }, 2000);

      console.log("Error deleting question", error);
    }
  };

  //--- CLASS

  const fetchClasses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/classes/get-classes");
      setClasses(response.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTest = async (name, subjectId, startTime, endTime, selectedFile) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("subjectId", subjectId);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    formData.append("responsePdfUrl", selectedFile);

    try {
      await axiosInstance.post(`/tests/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await fetchTests();
    } catch (error) {
      console.log("Error creating test : ", error);
    }
  };

  //--- See result

  const seeResult = useCallback(async (testId) => {
    setLoading(true);
    setNotGivenExam(false);

    try {
      const response = await axiosInstance.get(
        `/results/fetch-result/${testId}`
      );

      if (response.data.data) setResult(response.data.data);
      else setNotGivenExam(true);
    } catch (error) {
      console.log("Error fetching result", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        fetchTests,
        tests,
        loading,
        error,
        fetchSelectedTest,
        selectedTest,
        submitResponse,
        alreadySubmittedError,
        subjects,
        fetchSubjects,
        selectedSubject,
        fetchSelectedSubject,
        addQuestions,
        deleteQuestion,
        students,
        classes,
        fetchClasses,
        addTest,
        fetchUser,
        userDetails,
        role,
        id,
        seeResult,
        result,
        notGivenExam,
        // seeResultTeacher,
        alert,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  // console.log("Global Context:", context);
  return context;
};
