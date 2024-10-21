import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../Context/GlobalContext";
import AddQuestionModal from "./AddQuestionModal";
import { MdDelete } from "react-icons/md";
import Alert from "../Components/Alert";

const SubjectDetails_Teacher = () => {
  const { id } = useParams();
  const {
    fetchSelectedSubject,
    selectedSubject,
    loading,
    error,
    addQuestions,
    deleteQuestion,
    alert,
  } = useGlobalContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchSelectedSubject(id);
  }, []);

  const handleAddQuestion = (body, options, marks, answer) => {
    const classId = selectedSubject?.class?._id;
    console.log(classId);

    addQuestions(id, body, options, marks, answer, classId);
  };

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleDelete = (questionId) => {
    deleteQuestion(id, questionId);
  };

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
        Error fetching subject details: {error}
      </p>
    );
  }

  return (
    <div
      className="h-full flex flex-col items-center rounded-md p-4"
      style={{ backgroundColor: "#90A28D" }}
    >
      {loading ? (
        <p className="text-center text-gray-500">Loading subjects details...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : selectedSubject ? (
        <>
          <div className="flex justify-between w-full px-4 ml-6">
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">
                Subject: {selectedSubject.name}
              </h2>
              <p className="text-gray-900 mb-2 text-lg font-semibold">
                {selectedSubject.class?.name}
              </p>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Questions:
              </h3>
            </div>
            <div className="text-right">
              <button
                className="text-2xl font-bold text-gray-100 mb-8 border-2  rounded-md p-2"
                onClick={handleClick}
              >
                Add Question
              </button>
            </div>
          </div>

          <div className="flex justify-between w-full px-4 ml-6">
            <ul className="space-y-4 w-4/5">
              {selectedSubject.questions?.map((question, index) => (
                <li
                  key={question._id}
                  className="bg-gray-50 rounded-md p-4 shadow flex justify-between"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {index + 1}. {question.body}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {question.options?.map((option, optionIndex) => (
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
                  </div>

                  <div>
                    <MdDelete
                      onClick={() => handleDelete(question._id)}
                      className="text-red-600 text-3xl cursor-pointer"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <AddQuestionModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddQuestion={handleAddQuestion}
          />
        </>
      ) : (
        <p className="text-center text-gray-500">No Details found</p>
      )}
      {alert.show && (
        <Alert className="" type={alert.type} message={alert.message} />
      )}
    </div>
  );
};

export default SubjectDetails_Teacher;
