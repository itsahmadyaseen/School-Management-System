import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../Context/GlobalContext.jsx";

const Subjects = () => {
  const { fetchSubjects, subjects, loading, error, userDetails, fetchUsers } =
    useGlobalContext();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchUsers();
  }, []); // Run once on mount to fetch user details

  useEffect(() => {
    if (userDetails && userDetails.class) {
      // Check if userDetails and classId exist
      const classId = userDetails.class;
      // console.log("userDetails", userDetails);
      // console.log("in subject", classId);
      fetchSubjects(classId);
    }
  }, [userDetails]);

  const handleClick = (subjectId) => {
    console.log(role);

    role == "student" ? "" : navigate(`/teacher/subjects/${subjectId}`);
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
    <div
      className="flex flex-col items-center h-full rounded-md"
      style={{ backgroundColor: "#90A28D" }}
    >
      <div className="flex justify-center w-full p-4">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Subjects
        </h1>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-0">
        {subjects.map((subject) => (
          <div
            key={subject._id}
            onClick={() => handleClick(subject._id)}
            className="bg-white rounded-xl shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {subject.name}
            </h2>
            <p className="text-gray-600 text-lg mb-2">{subject.class.name}</p>
            <p className="text-gray-600 text-lg mb-2">
              Questions: {subject.questions.length}
            </p>
            <p className="text-gray-500 text-sm">
              Created At: {new Date(subject.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subjects;
