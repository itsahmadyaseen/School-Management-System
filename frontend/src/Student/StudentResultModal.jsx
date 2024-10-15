import { useCallback, useEffect, useState } from "react";
import { useGlobalContext } from "../Context/GlobalContext";
import axiosInstance from "../axiosInstance";
import { FaCheck, FaXmark } from "react-icons/fa6";

const StudentResultModal = ({ isOpen, onClose, testId }) => {
  // const { seeResult, result, loading, notGivenExam } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const [notGivenExam, setNotGivenExam] = useState(false);

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

  useEffect(() => {
    if (isOpen) {
      seeResult(testId);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl"
        style={{ backgroundColor: "#90A28D" }}
      >
        <div>
          <h2 className="text-2xl text-white font-semibold mb-4">Result</h2>
          {loading ? (
            <h2 className="text-xl text-gray-300">Loading...</h2>
          ) : notGivenExam ? (
            <h2 className="text-xl text-gray-300">You have not attempted the exam</h2>
          ) : (
            <div className="overflow-x-auto w-full px-3">
              <h3 className="text-gray-100 font-semibold text-lg">
                Total Score : {result?.score}
              </h3>
              <table className="min-w-full bg-white shadow-lg rounded-lg mb-2">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="py-2 px-4 text-left">Question</th>
                    <th className="py-3 px-6 text-left">Given answer</th>
                    <th className="py-3 px-6 text-left">Correct answer</th>
                    <th className="py-3 px-6 text-left">Weightage</th>
                    <th className="py-3 px-6 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {result?.answers?.map((ans, index) => (
                    <tr className="border-b" key={ans._id}>
                      {/* {console.log("dsa", ans)} */}
                      <td className="py-3 px-6 text-gray-800">{index + 1}</td>
                      <td className="py-3 px-6 text-gray-800">{ans.answer}</td>
                      <td className="py-3 px-6 text-gray-800">
                        {ans.question.answer}
                      </td>
                      <td className="py-3 px-6 text-gray-800">
                        {ans.question.marks}
                      </td>
                      <td className="py-3 px-6 text-gray-800">
                        {ans.answer === ans.question.answer ? (
                          <FaCheck className=" text-green-600" />
                        ) : (
                          <FaXmark className=" text-red-500" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="flex justify-end">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentResultModal;
