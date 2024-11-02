import { useEffect, useState } from "react";
import { useGlobalContext } from "../Context/GlobalContext";
import AddNewsModal from "../Teacher/AddNewsModal";
import NewsModal from "./NewsModal";

const News = () => {
  const { getNews, news, addNews } = useGlobalContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [hoveredNews, setHoveredNews] = useState(null);

  useEffect(() => {
    getNews();
  }, []);

  const handleCreate = () => {
    setIsAddModalOpen(true);
  };

  const handleAddNews = (title, description, body, date) => {
    addNews(title, description, body, date);
  };

  return (
    <div
      className="flex flex-col items-center h-full rounded-md"
      style={{ backgroundColor: "#90A28D" }}
    >
      <div className="flex justify-between w-full p-4">
        <div className="flex justify-center w-full p-4">
          <h1 className="text-4xl font-bold text-center text-white mb-8">
            News
          </h1>
        </div>
        <div className="">
          <button
            className="text-2xl font-bold text-white mb-8 border-2  rounded-md p-2"
            onClick={() => handleCreate()}
          >
            Create News
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {news.map((data, index) => (
            
          <NewsModal data={data} index={index} key={index} />
        ))}
      </div>

      {isAddModalOpen && (
        <AddNewsModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddNews={handleAddNews}
        />
      )}
    </div>
  );
};

export default News;
