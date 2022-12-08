import React from "react";

const Progress = () => {
  const timeInHours = 13;
  const timeInMinutes = 10;
  const progress = ((timeInHours + timeInMinutes / 60) * 100) / 24;
  console.log(  progress);
  return (
    <div className=" bg-white w-full rounded-2xl  pt-1">
      <div className=" progress flex rounded-2xl  bg-green-200">
        <div
          style={{ width: `${progress}%` }}
          className="shadow-none flex flex-col rounded-2xl text-center whitespace-nowrap text-white justify-center bg-green-500"
        >
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

export default Progress;
