import { createContext, useCallback, useContext, useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alreadySubmittedError, setAlreadySubmittedError] = useState(null);

  const navigate = useNavigate();

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
      await axiosInstance.post(`/results/submit-response`, {
        testId: id,
        answers,
      });
      navigate("/results");

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
      const response = await axiosInstance.get("/subjects/get");
      setSubjects(response.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSelectedSubject = useCallback(async (id) => {
    try {
      console.log("inside");

      const response = await axiosInstance.get(`/subjects/get/${id}`);
      console.log("response subject", response.data.data);

      setSelectedSubject(response.data.data);
      setLoading(false);
    } catch (error) {
      // console.log('error response', error.response);

      setError(error.message);
      setLoading(false);
    }
  }, []);

  // QUESTIONS

  const addQuestions = async (id, body, options, marks, answer) => {
    try {
      await axiosInstance.post(`/questions/create/${id}`, body, options, marks, answer);

      fetchSelectedSubject();
    } catch (error) {
      console.log("Error adding question", error);
    }
  };

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  console.log("Global Context:", context);
  return context;
};
