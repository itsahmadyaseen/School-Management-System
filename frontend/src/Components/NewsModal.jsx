/* eslint-disable react/prop-types */

const NewsModal = ({ data, index }) => {
  return (
    <div
      key={index}
      className="relative group w-52 h-48 bg-gray-100 outline rounded-sm outline-green-950 overflow-hidden"
    >
      <div className="h-1/4 flex justify-center items-center">
        <h1 className="text-2xl font-semibold px-2">{data.title}</h1>
      </div>
      <div className="h-3/4 bg-gray-200 flex items-center">
        <p className="text-md text-center">{data.description}</p>
      </div>

      <div
        className="fixed top-1/2 left-1/2 bg-white p-6 rounded-lg shadow-lg invisible opacity-0 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 
            group-hover:visible group-hover:opacity-100 z-10"
      >
        <h2 className="text-2xl font-semibold mb-4">{data.title}</h2>
        <p>
          <strong>Description:</strong> {data.description}
        </p>
        <p>
          <strong>Body:</strong> {data.body}
        </p>
        <p>
          <strong>Date:</strong> {data.date}
        </p>
      </div>
    </div>
  );
};

export default NewsModal;
