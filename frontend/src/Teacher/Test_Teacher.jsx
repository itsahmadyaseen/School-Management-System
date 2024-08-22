import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Context/GlobalContext.jsx";
import AddTestModal from "./AddTestModal.jsx";

const Test_Teacher = () => {
  const { fetchTests, tests, loading, error, addTest } = useGlobalContext();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTests();
  }, []);

  const handleClick = (testId) => {
    navigate(`/test/${testId}`);
  };

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  const handleAddTest = (name, classId, subjectId, startTime, endTime) => {
    addTest(name, classId, subjectId, startTime, endTime);
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
      <div className="flex justify-between w-full p-4">
        <div></div>
        <div className="">
          <h1 className="text-3xl font-bold text-center text-gray-300 mb-8">
            Tests
          </h1>
        </div>

        <div className="">
          <button
            className="text-2xl font-bold text-cyan-100 mb-8 border-2  rounded-md p-2"
            onClick={()=>handleCreate()}
          >
            Create Test
          </button>
        </div>
      </div>
      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tests.length > 0 ? (
          tests.map((test) => (
            <div
              key={test._id}
              onClick={() => handleClick(test._id)}
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {test.subject.name}
              </h2>
              <p className="text-gray-600">Class: {test.class.name}</p>
              <p className="text-gray-600">
                Questions: {test.questions.length}
              </p>
              <p className="text-gray-600">
                Exam Status: {test.questions.isActive ? "Ongoing" : "Ended"}
              </p>
              <p className="text-gray-600">
                Created At: {new Date(test.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No tests available</p>
        )}
      </div>
      <AddTestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTest={handleAddTest}
      />
    </div>
  );
};

export default Test_Teacher;
