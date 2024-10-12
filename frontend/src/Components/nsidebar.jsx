import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { FiMoreVertical } from "react-icons/fi";
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export function Nsidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="flex">
      <aside className="fixed top-0 left-0 h-screen bg-white border-r shadow-sm">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <span
              className={`overflow-hidden text-black font-bold transition-all ${
                expanded ? "w-16 h-7" : "w-0"
              }`}
            >
              SMS
            </span>
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="p-1.5 bg-gray-50 hover:bg-gray-200 rounded-md"
            >
              {expanded ? (
                <LuChevronFirst size={20} />
              ) : (
                <LuChevronLast size={20} />
              )}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          <div
            className={`flex justify-between items-center border-t ml-2 mb-2 pt-2 overflow-hidden transition-all ${
              expanded ? "w-72" : "w-0"
            } `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Ahmad Yaseen</h4>
              <span className="text-xs text-gray-600">
                itahmadyaseen@gmail.com
              </span>
            </div>
            <FiMoreVertical size={22} />
          </div>
        </nav>
      </aside>
    </div>
  );
}

export function SidebarItem({ icon, text, active, alert, onClick }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      onClick={onClick}
      className={`relative group flex items-center font-medium py-2 px-3 my-1 rounded-md transition-colors cursor-pointer
    ${
      active
        ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
        : "hover:bg-indigo-50 text-gray-950"
    }
  `}
    >
      {/* Icon of the list item */}
      {icon}

      {/* Text label that expands/collapses */}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>

      {/* Optional alert indicator */}
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        ></div>
      )}

      {/* Tooltip or hover content */}
      {!expanded && (
        <div
          className={`
        absolute left-full rounded-md px-2 py-1 ml-3
        bg-indigo-100 text-indigo-800 text-sm
        invisible opacity-0 translate-x-3 transition-all duration-300
        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
