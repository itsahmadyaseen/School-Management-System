import React, { createContext, useCallback, useContext, useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [tests, setTests] = useState();
    const [selectedTest, setSelectedTest] = useState();
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      console.log('its running', id);
      
      const response = await axiosInstance.get(`/tests/get/${id}`);
      console.log(response);
      
      setSelectedTest(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

const submitResponse =  async (id, answers)=>{
  try {
    await axiosInstance.post(`/results/submit-response`, {
      testId: id,
      answers,
    });
    // console.log(response.data);
  } catch (error) {
    console.error("Error submitting test:", error);
  }
}
  

  

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
