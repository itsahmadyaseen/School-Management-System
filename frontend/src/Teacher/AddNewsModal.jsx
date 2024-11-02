import { useState } from "react";

const AddNewsModal = ({ isOpen, onClose, onAddNews }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");

  const handleAdd = () => {
    onAddNews(title, description, body, date);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Add News</h2>

        <p>Title</p>
        <input
          type="text"
          placeholder="Title"
          value={title}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          onChange={(e) => setTitle(e.target.value)}
        />

        <p>Description</p>
        <textarea
          placeholder="Description"
          value={description}
          className="w-full p-2 border border-gray-300 rounded mb-4 h-18"
          onChange={(e) => setDescription(e.target.value)}
        />

        <p>Body</p>
        <textarea
          placeholder="Body"
          value={body}
          className="w-full p-2 border border-gray-300 rounded mb-4 h-24"
          onChange={(e) => setBody(e.target.value)}
        />

        <p>Date</p>
        <input
          type="date"
          placeholder="Date"
          value={date}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          onChange={(e) => setDate(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAdd}
          >
            Add News
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewsModal;
