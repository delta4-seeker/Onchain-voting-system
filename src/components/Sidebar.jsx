import React from "react";
import { NavLink } from "react-router-dom";
const Sidebar = ({ children }) => {
  let activeStyle = {
    color: "white",
    backgroundColor: "blue" , 
  };
  return (
    <div className=" fixed  flex  w-full   ">
      <div className="text-xl w-full flex flex-col text-center flex-[0.2] h-screen border-r-2  py-10 ">
        <NavLink
          to="/admin/dashboard"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="border-2 border-gray px-3 py-2  hover:shadow-md"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/candidate"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="border-2 border-gray px-3 py-2 hover:shadow-sm"
        >
          Candidate
        </NavLink>
        <NavLink
          to="/admin/election"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="border-2 border-gray px-3 py-2 hover:shadow-md"
        >
          Election
        </NavLink>
        <NavLink
          to="/admin/voters"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="border-2 border-gray px-3 py-2 hover:shadow-md"
        >
          Voters
        </NavLink>
        <NavLink
          to="/admin/reset"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="border-2 border-gray px-3 py-2 hover:shadow-md"
        >
          Reset
        </NavLink>
        <NavLink
          to="/admin/result"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="border-2 border-gray px-3 py-2 hover:shadow-md"
        >
          Result
        </NavLink>
      </div>
      <div className="flex-[0.8] bg-gray-100 justify-center w-full">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
