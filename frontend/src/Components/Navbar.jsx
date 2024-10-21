import { useEffect } from "react";
import { useGlobalContext } from "../Context/GlobalContext";

const Navbar = () => {
  const { userDetails, fetchUser } = useGlobalContext();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <aside className=" w- h-16 ">
      <nav className="w-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <span className="overflow-hidden text-xl text-black font-bold transition-all">
            {userDetails.fullname} 
          </span>
          <span
            className={`overflow-hidden text-xl text-black font-bold transition-all `}
          >
            SMS
          </span>
          <span className="p-1.5 text-lg font-semibold bg-gray-50 hover:bg-gray-200 rounded-md">
          {userDetails?.role?.toUpperCase()}
          </span>
        </div>
      </nav>
    </aside>
  );
};

export default Navbar;
