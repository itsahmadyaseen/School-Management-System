import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

const AddTestModal = ({ isOpen, onClose, onAddTest }) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [type, setType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // const { fetchSubjects, subjects } = useGlobalContext();

  // Call fetchSubjects only when modal is opened
  useEffect(() => {
    if (isOpen) {
      const fetchSubjects = async () => {
        try {
          // setLoading(true);

          const response = await axiosInstance.get(`/subjects/get-subjects`);
          setSubjects(response.data.data);
          // setLoading(false);
        } catch (error) {
          // setError(error.message);
        } finally {
          // setLoading(false);
        }
      };
      fetchSubjects();
    }
  }, [isOpen]); // This will only call fetchSubjects when `isOpen` changes to true

  const handleAddTest = () => {
    onAddTest(name, subject, startTime, endTime, selectedFile);
    onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("file", file);

    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Please upload a valid PDF file");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Create Test</h2>

        <p>Name</p>
        <input
          type="text"
          placeholder="Name"
          value={name}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          onChange={(e) => setName(e.target.value)}
        />

        <p>Type</p>
        <select
          name="type"
          value={type}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          onChange={(e) => setType(e.target.value)}
          id="type"
        >
          <option value="">Select Type</option>
          <option value="Objective">Objective</option>
          <option value="Subjective">Subjective</option>
        </select>

        {type === "Objective" ? (
          <>
            <p>Subject</p>
            <select
              name="subject"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              id="subject"
            >
              <option value="">Select subject</option>
              {subjects &&
                subjects.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
            </select>
          </>
        ) : (
          <>
            <p>Subject</p>
            <select
              name="subject"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              id="subject"
            >
              <option value="">Select subject</option>
              {subjects &&
                subjects.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
            </select>
            <p>Upload pdf</p>
            <input
              className="w-full p-2 border border-gray-300 rounded mb-4"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </>
        )}
        <p>Start Time</p>
        <input
          type="time"
          value={startTime}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          onChange={(e) => setStartTime(e.target.value)}
        />

        <p>End Time</p>
        <input
          type="time"
          value={endTime}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          onChange={(e) => setEndTime(e.target.value)}
        />

        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-cyan-600 text-white px-4 py-2 rounded"
            onClick={handleAddTest}
          >
            Add Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTestModal;
