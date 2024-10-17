import { useCallback, useEffect, useState } from "react";
// import { useGlobalContext } from "../Context/GlobalContext";
import axiosInstance from "../axiosInstance";

const TeacherResultModal = ({ isOpen, onClose, testId }) => {
  // const { seeResult, result, loading, notGivenExam } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [notGivenExam, setNotGivenExam] = useState(false);

  const seeResult = useCallback(async (testId) => {
    setLoading(true);
    setNotGivenExam(false);

    try {
      const response = await axiosInstance.get(
        `/results/fetch-result-teacher/${testId}`
      );
      console.log(response.data.data);

      if (response.data.data.length > 0) setResult(response.data.data);
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
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl"
        style={{ backgroundColor: "#90A28D" }}
      >
        <div>
          <h2 className="text-2xl text-white font-semibold mb-4">Result</h2>
          {loading ? (
            <h2 className="text-xl text-gray-300">Loading results...</h2>
          ) : notGivenExam ? (
            <h2 className="text-xl text-gray-300">No one has given exam</h2>
          ) : (
            <div className="overflow-x-auto w-full px-3">
              <table className="min-w-full bg-white shadow-lg rounded-lg mb-2">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="py-2 px-4 text-left">S No.</th>
                    <th className="py-3 px-6 text-left">Student</th>
                    <th className="py-3 px-6 text-left">Score</th>
                    <th className="py-3 px-6 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {result.map((res, index) => (
                    <tr className="border-b" key={res._id}>
                      <td className="py-3 px-6 text-gray-800">{index + 1}</td>
                      <td className="py-3 px-6 text-gray-800">
                        {res.fullName}
                      </td>
                      <td className="py-3 px-6 text-gray-800">{res.score}</td>
                      <td className="py-3 px-6 text-gray-800">{res.status}</td>
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

export default TeacherResultModal;
