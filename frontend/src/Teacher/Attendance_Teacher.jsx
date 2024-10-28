import { FaCheck, FaXmark } from "react-icons/fa6";
import { useGlobalContext } from "../Context/GlobalContext";
import { useEffect, useState } from "react";
import Alert from "../Components/Alert";

const Attendance_Teacher = () => {
  const { fetchStudents, students, submitAttendance, loading, alert } =
    useGlobalContext();
  const [attendanceDetails, setAttendanceDetails] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-GB");

  const updateAttendance = (studentId, status) => {
    setAttendanceDetails((prevDetails) => {
      // Check if the student already has an attendance record
      const existingStudent = prevDetails.find(
        (detail) => detail.studentId === studentId
      );
      if (existingStudent) {
        // Update the status if the student already exists
        return prevDetails.map((detail) =>
          detail.studentId === studentId ? { ...detail, status } : detail
        );
      } else {
        // Add a new attendance record
        return [...prevDetails, { studentId, status }];
      }
    });
  };

  return (
    <div
      className="flex flex-col items-center h-full rounded-md"
      style={{ backgroundColor: "#90A28D" }}
    >
      <div className="flex justify-center w-full p-4">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Class Attendance
        </h1>
      </div>

      <div className="flex justify-start w-full p-4">
        <h3 className="text-2xl font-bold text-center text-white ml-6 mb-8">
          Date : <span className="underline">{formattedDate}</span>
        </h3>
      </div>
      <div className=" min-w-full flex justify-center">
        <table className="w-1/2 bg-white shadow-lg rounded-lg mb-2">
          <thead>
            <tr className="bg-gray-200 text-gray-700 ">
              <th className="py-2 px-6 text-left">S No.</th>
              <th className="py-2 px-6 text-left">Student</th>
              <th className="py-2 px-6 text-left">Present</th>
              <th className="py-2 px-6 text-left">Absent</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td>
                  <p className="text-lg text-center text-gray-500">
                    Loading List...
                  </p>
                </td>
              </tr>
            ) : (
              <>
                {students.map((stu, index) => {
                  const studentStatus = attendanceDetails.find(
                    (detail) => detail.studentId === stu._id
                  );

                  return (
                    <tr key={stu._id}>
                      <td className="py-2 px-6 text-left">{index + 1}</td>
                      <td className="py-2 px-6 text-left">{stu.fullname}</td>
                      <td className="py-2 px-6 text-left">
                        <FaCheck
                          onClick={() => updateAttendance(stu._id, "Present")}
                          className={`text-3xl ${
                            studentStatus?.status === "Present"
                              ? "text-green-700"
                              : "text-green-400"
                          } font-light rounded cursor-pointer`}
                        />
                      </td>
                      <td className="py-2 px-6 text-left">
                        <FaXmark
                          onClick={() => updateAttendance(stu._id, "Absent")}
                          className={`text-3xl ${
                            studentStatus?.status === "Absent"
                              ? "text-red-700"
                              : "text-red-400"
                          } rounded cursor-pointer`}
                        />
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center w-full p-4">
        <button
          onClick={() => submitAttendance(attendanceDetails)}
          className=" text-white font-bold py-2 px-6 rounded"
          style={{ backgroundColor: "#6B7A6D" }}
        >
          Submit Attendance
        </button>
      </div>
      {alert.show && (
        <Alert className="" type={alert.type} message={alert.message} />
      )}
    </div>
  );
};

export default Attendance_Teacher;
