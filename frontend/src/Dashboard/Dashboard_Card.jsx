/* eslint-disable react/prop-types */

const Dashboard_Card = ({ img, totalCount, topic }) => {
  return (
    <div className="w-56 h-48 bg-gray-100 outline rounded-sm outline-green-950">
      <div className="h-4/5 flex  justify-evenly align-middle">
        <div className="h-full w-full">
          <img
            src={img}
            alt="student logo"
            className="rounded-full h-full "
          />
        </div>

        <p className="text-lg">{totalCount}</p>
      </div>
      <div className="h-1/5 flex flex-col justify-between align-middle">
        <div className="bg-black"></div>
        <h1 className="text-xl text-center">{topic}</h1>
      </div>
    </div>
  );
};

export default Dashboard_Card;
