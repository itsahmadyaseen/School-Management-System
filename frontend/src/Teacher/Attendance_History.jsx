import { FaCheck, FaXmark } from "react-icons/fa6";
import { useGlobalContext } from "../Context/GlobalContext";
import { useEffect, useState } from "react";
import Alert from "../Components/Alert";

const Attendance_History = () => {
  const { getAttendanceForTeacher, teacherAttendanceDetails, alert } =
    useGlobalContext();

  const [date, setDate] = useState("");

  useEffect(() => {
    const todaysDate = new Date();
    const formattedDate = todaysDate.toLocaleDateString("en-GB");

    // setDate(formattedDate);
    getAttendanceForTeacher(formattedDate);
  }, []);

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);

    setDate(selectedDate.toLocaleDateString("en-GB"));
    getAttendanceForTeacher(selectedDate.toLocaleDateString("en-GB"));
  };

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

      <div className="flex justify-start w-full p-4">
        <h3 className="text-2xl font-bold text-center text-white ml-6 mb-8">
          Select Date :{" "}
          <span className="underline">
            {date || new Date().toLocaleDateString("en-GB")}
          </span>
        </h3>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          className="ml-4 h-9 p-2 rounded"
        />
      </div>

      <div className=" min-w-full flex justify-center">
        <table className="w-1/2 bg-white shadow-lg rounded-lg mb-2">
          <thead>
            <tr className="bg-gray-200 text-gray-700 ">
              <th className="py-2 px-6 text-left">No.</th>
              <th className="py-2 px-6 text-left">Student</th>
              <th className="py-2 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <>
              {teacherAttendanceDetails &&
              teacherAttendanceDetails.length > 0 ? (
                <>
                  {teacherAttendanceDetails.map((attendance, index) => (
                    <tr key={attendance._id}>
                      <td className="py-2 px-6 text-left">{index + 1}</td>
                      <td className="py-2 px-6 text-left">
                        {attendance.studentName}
                      </td>
                      <td className="py-2 px-6 text-left">
                        {attendance?.status === "Present" ? (
                          <FaCheck className="text-3xl text-green-400 font-light rounded" />
                        ) : (
                          <FaXmark className="text-3xl text-red-400 rounded" />
                        )}
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-gray-500">
                    <p className="text-lg font-medium">No Data Available</p>
                  </td>
                </tr>
              )}
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

export default Attendance_History;
