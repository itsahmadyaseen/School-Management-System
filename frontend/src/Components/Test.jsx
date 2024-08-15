import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Context/GlobalContext.jsx";

const Tests = () => {
  const { fetchTests, tests, loading, error } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTests();
  }, []);

  const handleClick = (testId) => {
    navigate(`/test/${testId}`);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading tests...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">Error fetching tests: {error}</p>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen  bg-cyan-950 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-300 mb-8">
        Tests
      </h1>
      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tests.map((test) => (
          <div
            key={test._id}
            onClick={() => handleClick(test._id)}
            className="bg-white rounded-lg shadow-lg p-6 cursor-pointer"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {test.subject.name}
            </h2>
            <p className="text-gray-600">Class: {test.class.name}</p>
            <p className="text-gray-600">Questions: {test.questions.length}</p>
            <p className="text-gray-600">
              Created At: {new Date(test.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tests;
