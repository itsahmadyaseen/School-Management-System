import React from "react";

const Welcome_Card = () => {
  return (
    <div className="w-56 h-48 bg-[url('https://img.freepik.com/premium-photo/floral-welcome-banner_1268171-11542.jpg?semt=ais_hybrid')] bg-cover bg-center outline rounded-sm outline-green-950">
      <div className="h-full w-full flex flex-col justify-between">
        <div className="h-1/2 flex items-center justify-center bg-b">
          <h1 className="text-lg">Welcome to School Website</h1>
        </div>
        {/* <div className="h-4/6 flex justify-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzpm5fEgQZk-S1mrr3O9W2SBn638uZRuhPNQ&s"
            alt=""
            className="rounded-full h-full"
          />
        </div> */}
        <div className="h-1/2 flex items-center justify-center ">
          <h3 className="text-lg ">India's Top Digital School</h3>
        </div>
      </div>
    </div>
  );
};

export default Welcome_Card;
