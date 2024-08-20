import React, { useState } from "react";

const AddQuestionModal = ({ isOpen, onClose, onAddQuestion }) => {
  const [questionBody, setQuestionBody] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [marks, setMarks] = useState(1);
  const [answer, setAnswer] = useState("");

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleAddQuestion = () => {
    const body = questionBody;
    onAddQuestion(body, options, marks,answer);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Add New Question</h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Question text"
          value={questionBody}
          onChange={(e) => setQuestionBody(e.target.value)}
        />
        <h3 className="font-medium mb-2">Options:</h3>
        {options.map((option, index) => (
          <input
            key={index}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        ))}
        <label>Answer : </label>
        <select value={answer} onChange={(e) => setAnswer(e.target.value)}>
            <option value="" disabled>Select Correct Answer</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {`Option ${index + 1}: ${option}`}
              </option>
            ))}
          </select>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Marks"
          value={marks}
          onChange={(e) => setMarks(Number(e.target.value))}
          min="1"
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
            onClick={handleAddQuestion}
          >
            Add Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionModal;
