import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="max-w-10xl bg-gray-150 flex flex-col items-center">
     <h1 className="mt-5 text-4xl sm:text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
  Добро пожаловать в мой маленький проект!
</h1>


       <nav className="mt-8 flex justify-center gap-6">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `px-6 py-2 font-semibold text-sm rounded-full transition-all duration-300
            ${
              isActive
                ? "bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-lg"
                : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-300 hover:to-purple-300 hover:text-white"
            }`
          }
        >
          Sync
        </NavLink>

        <NavLink
          to="/async"
          className={({ isActive }) =>
            `px-6 py-2 font-semibold text-sm rounded-full transition-all duration-300
            ${
              isActive
                ? "bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-lg"
                : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-300 hover:to-purple-300 hover:text-white"
            }`
          }
        >
          Async
        </NavLink>
      </nav>

       <div className="p-6 w-full max-w-8xl ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
