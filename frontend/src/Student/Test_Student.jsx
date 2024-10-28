import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Context/GlobalContext.jsx";
import StudentResultModal from "./StudentResultModal.jsx";

const Test_Student = () => {
  const { fetchTests, tests, loading, error } = useGlobalContext();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testId, setTestId] = useState("");

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
    <div
      style={{ backgroundColor: "#90A28D" }}
      className="flex flex-col items-center h-full rounded-md  "
    >
      <div className="flex justify-center w-full p-4">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Tests
        </h1>
      </div>
      <div className="overflow-x-auto w-full px-3">
        <table className="min-w-full bg-white shadow-lg rounded-lg mb-2">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-6 text-left">Subject</th>
              <th className="py-3 px-6 text-left">Class</th>
              <th className="py-3 px-6 text-left">Questions</th>
              <th className="py-3 px-6 text-left">Exam Status</th>
              <th className="py-3 px-6 text-left">Created At</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {tests.length > 0 ? (
              tests.map((test) => (
                <tr key={test._id} className="border-b">
                  <td className="py-3 px-6 text-gray-800">
                    {test.subject.name}
                  </td>
                  <td className="py-3 px-6 text-gray-600">{test.class.name}</td>
                  <td className="py-3 px-6 text-gray-600">
                    {test.questions.length == 0 ? "PDF" : test.questions.length}
                  </td>
                  <td className="py-3 px-6 text-gray-600">
                    {test.isActive ? "Ongoing" : "Ended"}
                  </td>
                  <td className="py-3 px-6 text-gray-600">
                    {new Date(test.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6">
                    {!test.isActive ? (
                      <button
                        className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 }`}
                        onClick={() => {
                          setIsModalOpen(true);
                          setTestId(test._id);
                        }}
                      >
                        See result
                      </button>
                    ) : (
                      <button
                        className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700`}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering onClick on the row

                          handleClick(test._id);
                        }}
                      >
                        Give Test
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-3 px-6 text-center text-gray-600">
                  No tests available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <StudentResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        testId={testId}
      />
    </div>
  );
};

export default Test_Student;
