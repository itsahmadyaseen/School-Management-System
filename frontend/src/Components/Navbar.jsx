import React from 'react'

const Navbar = () => {
  return (
    <aside className=" w- h-16 ">
      <nav className="w-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <span
            className={`overflow-hidden text-black font-bold transition-all `}
          >
            SMS
          </span>
          <button
            className="p-1.5 bg-gray-50 hover:bg-gray-200 rounded-md"
          >
           
          </button>
        </div>

        
        
      </nav>
    </aside>
  )
}

export default Navbar