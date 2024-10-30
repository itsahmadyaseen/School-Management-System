import { useState } from "react";

const Calendar = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Month names for display
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

    const days = [];
    // Add empty days for the previous month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`}></div>);
    }

    // Add days for the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === new Date().getDate() &&
        currentMonth === new Date().getMonth() &&
        currentYear === new Date().getFullYear();

      days.push(
        <div
          key={day}
          className={`text-center py-2 border cursor-pointer ${
            isToday ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => openModal(day)}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  // Function to handle opening modal with selected date
  const openModal = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    setSelectedDate(
      date.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    setIsModalOpen(true);
  };

  // Functions to navigate months
  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    setCurrentYear((prev) => (currentMonth === 0 ? prev - 1 : prev));
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    setCurrentYear((prev) => (currentMonth === 11 ? prev + 1 : prev));
  };

  return (
    <div className="flex items-start justify-center h-full w-full ">
      <div className="w-full mx-auto p-1">
        <div className="bg-white h-full shadow-lg rounded-lg overflow-hidden">
          {/* Header with month navigation */}
          <div className="flex  justify-between h-full px-6 py-3 bg-gray-700">
            <button onClick={goToPreviousMonth} className="text-white">
              Previous
            </button>
            <h2 className="text-white">{`${monthNames[currentMonth]} ${currentYear}`}</h2>
            <button onClick={goToNextMonth} className="text-white">
              Next
            </button>
          </div>
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2 p-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-semibold">
                {day}
              </div>
            ))}
            {generateCalendarDays()}
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
              <div className="py-4 text-left px-6">
                <div className="flex justify-between items-center pb-3">
                  <p className="text-2xl font-bold">Selected Date</p>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring"
                  >
                    ✕
                  </button>
                </div>
                <div className="text-xl font-semibold">{selectedDate}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
