import { useEffect, useState } from "react";

const Alert = ({ type, message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false); // Trigger fade-out transition
    }, 2000); // Keep the alert visible for 2 seconds

    return () => clearTimeout(timeout);
  }, []);

  const getAlertClasses = () => {
    const baseClasses = `fixed bottom-5 right-5 z-50 w-96 h-20 rounded-lg p-4 transition-opacity duration-500 shadow-lg`; // Fixed position, z-index to show above all
    const visibilityClass = isVisible ? "opacity-100" : "opacity-0"; // Fade effect
    switch (type) {
      case "success":
        return `${baseClasses} bg-teal-50 border-t-2 border-teal-500 ${visibilityClass}`;
      case "error":
        return `${baseClasses} bg-red-50 border-s-4 border-red-500 ${visibilityClass}`;
      default:
        return `${baseClasses} ${visibilityClass}`;
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <span className="inline-flex  justify-center items-center size-8 rounded-full border-4 border-teal-100 bg-teal-200 text-teal-800">
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </span>
        );
      case "error":
        return (
          <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-red-100 bg-red-200 text-red-800">
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className={getAlertClasses()} role="alert" tabIndex="-1">
      <div className="flex">
        <div className="shrink-0">{getIcon()}</div>
        <div className="ms-3">
          <h3 className="text-gray-800 font-semibold">
            {type === "success" ? "Success" : "Error!"}
          </h3>
          <p className="text-sm text-gray-700">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Alert;
