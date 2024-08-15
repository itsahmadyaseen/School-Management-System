import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Context/GlobalContext";

const SubjectDetails = () => {
  const [answers, setAnswers] = useState([]);
  const { id } = useParams();
  // const navigate = useNavigate();
  const { fetchSelectedSubject, selectedSubject, loading, error } =
    useGlobalContext();

  useEffect(() => {
    fetchSelectedSubject(id);
  }, []);

  if (loading) {
    return (
      <p className="text-center text-3xl border-b-4 text-gray-500">
        Loading subject details...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Error fetching test details: {error}
      </p>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8">
      <h1 className="text-3xl font-bold text-cyan-600 mb-8">
        {selectedSubject.name}
      </h1>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Subject: {selectedSubject.name}
      </h2>
      <p className="text-gray-600 mb-2">{selectedSubject.class.name}</p>
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Questions:</h3>
      <ul className="space-y-4">
        {selectedSubject.questions.map((question, index) => (
          <li key={question._id} className="bg-gray-50 rounded-lg p-4 shadow">
            <p className="font-medium text-gray-800">
              {index + 1}. {question.body}
            </p>
            <ul className="mt-2 space-y-1">
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex} className="text-gray-600">
                  <label className="flex items-center">
                    {optionIndex + 1}. {option}
                  </label>
                </li>
              ))}
              <p className="mt-2 text-sm text-gray-500">
                Marks: {question.marks}
              </p>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectDetails;
