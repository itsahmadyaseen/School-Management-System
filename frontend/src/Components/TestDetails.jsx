import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../Context/GlobalContext";

const TestDetails = () => {
  const [answers, setAnswers] = useState([]);
  const { id } = useParams();
  // const navigate = useNavigate();
  const {
    fetchSelectedTest,
    selectedTest,
    loading,
    error,
    submitResponse,
    alreadySubmittedError,
  } = useGlobalContext();

  useEffect(() => {
    fetchSelectedTest(id);
  }, []);

  const handleChange = (question, answer) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.filter(
        (answer) => answer.question !== question
      );
      return [...updatedAnswers, { question, answer }];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitResponse(id, answers);
  };

  if (loading) {
    return (
      <p className="text-center text-3xl border-b-4 text-gray-500">
        Loading test details...
      </p>
    );
  }

  if (alreadySubmittedError) {
    return (
      <div>
        {" "}
        <h3 className="text-center text-3xl text-gray-500">
          Authorization restricted
        </h3>
        <p className="text-center text-xl text-gray-500">
          You have already submitted the response
        </p>
      </div>
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
    <div  className="h-full flex flex-col items-center rounded-md p-4" style={{ backgroundColor: "#90A28D" }}>
      {loading ? (
        <p className="text-center text-gray-500">Loading test details...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : selectedTest ? (
        <>
          <h1 className="text-3xl font-bold text-white mb-8">
            {selectedTest.name}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="w-full shadow-lg p-6" 
            style={{ backgroundColor: "#90A28D" }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Subject: {selectedTest.subject?.name}
            </h2>
            <p className="text-gray-600 mb-2">{selectedTest.class?.name}</p>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Questions:
            </h3>
            <ul className="space-y-4">
              {selectedTest.questions?.map((question, index) => (
                <li
                  key={question._id}
                  className="bg-gray-50 rounded-lg  p-4 shadow"
                >
                  <p className="font-medium text-gray-800">
                    {index + 1}. {question.body}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {question.options?.map((option, optionIndex) => (
                      <li key={optionIndex} className="text-gray-600">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={`question-${question._id}`}
                            value={option}
                            onChange={() => handleChange(question._id, option)}
                            className="mr-2"
                          />
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
            <button
              type="submit"
              className="mt-6 w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition duration-200"
            >
              Submit Test
            </button>
          </form>
        </>
      ) : (
        <p className="text-center text-gray-500">No Details found</p>
      )}
    </div>
  );
};

export default TestDetails;
