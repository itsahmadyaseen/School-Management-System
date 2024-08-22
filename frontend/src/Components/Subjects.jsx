import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../Context/GlobalContext.jsx";

const Subjects = () => {
  const { fetchSubjects, subjects, loading, error } = useGlobalContext();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  console.log(classId);
  

  useEffect(() => {
    fetchSubjects(classId);
  }, []);

  const handleClick = (subjectId) => {
    console.log(role);

    navigate(
      role == "student"
        ? `/student/subjects/${subjectId}`
        : `/teacher/subjects/${subjectId}`
    );
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading subjects...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Error fetching subjects: {error}
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen  bg-cyan-950 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-300 mb-8">
        Subjects
      </h1>
      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {subjects.map((subject) => (
          <div
            key={subject._id}
            onClick={() => handleClick(subject._id)}
            className="bg-white rounded-lg shadow-lg p-6 cursor-pointer"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {subject.name}
            </h2>
            <p className="text-gray-600">Class: {subject.class.name}</p>
            <p className="text-gray-600">
              Questions: {subject.questions.length}
            </p>
            <p className="text-gray-600">
              Created At: {new Date(subject.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subjects;
