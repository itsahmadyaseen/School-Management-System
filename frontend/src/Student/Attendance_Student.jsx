import { FaCheck, FaXmark } from "react-icons/fa6";
import { useGlobalContext } from "../Context/GlobalContext";
import { useEffect } from "react";
import Alert from "../Components/Alert";

const Attendance_Student = () => {
  const { getAttendanceForStudent, studentAttendanceDetails, alert } =
    useGlobalContext();

  useEffect(() => {
    getAttendanceForStudent();
  }, []);

  return (
    <div
      className="flex flex-col items-center h-full rounded-md"
      style={{ backgroundColor: "#90A28D" }}
    >
      <div className="flex justify-center w-full p-4">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Attendance History
        </h1>
      </div>

      <div className=" min-w-full flex justify-center">
        <table className="w-1/2 bg-white shadow-lg rounded-lg mb-2">
          <thead>
            <tr className="bg-gray-200 text-gray-700 ">
              <th className="py-2 px-6 text-left">No.</th>
              <th className="py-2 px-6 text-left">Date</th>
              <th className="py-2 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <>
              {studentAttendanceDetails.map((attendance, index) => {
                return (
                  <tr key={attendance._id}>
                    <td className="py-2 px-6 text-left">{index + 1}</td>
                    <td className="py-2 px-6 text-left">{attendance.date}</td>
                    <td className="py-2 px-6 text-left">
                      {attendance?.status === "Present" ? (
                        <FaCheck
                          className={`text-3xl text-green-400 font-light rounded`}
                        />
                      ) : (
                        <FaXmark className={`text-3xl text-red-400 rounded`} />
                      )}
                    </td>
                  </tr>
                );
              })}
            </>
          </tbody>
        </table>
      </div>

      {alert.show && (
        <Alert className="" type={alert.type} message={alert.message} />
      )}
    </div>
  );
};

export default Attendance_Student;
