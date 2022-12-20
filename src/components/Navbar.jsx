import React from "react";
import { FcApproval } from "react-icons/fc";
const Navbar = () => {
  return (
    <div className="flex py-5 border-b-2  items-center shadow-md justify-between px-5">
      <h1 className="text-xl font-bold text-blue-500">On Chain voting System Admin</h1>
      <div className="flex text-sm items-center space-x-2">
        <FcApproval />
        <h1>Verified</h1>
      </div>
    </div>
  );
};

export default Navbar;
