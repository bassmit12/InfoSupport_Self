import React, { useState } from "react";

const Plus_Min_Button = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <div className="border border-gray-100 rounded-full flex flex-row justify-around ml-5 h-9 items-center w-24">
        <button
          className="border rounded-full bg-primary text-white h-6 w-6 text-center"
          onClick={() => setCount(count - 1)}
        >
          -
        </button>
        <h1>{count}</h1>
        <button
          className="border rounded-full bg-primary text-white h-6 w-6 text-center"
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </div>
    </>
  );
};

export default Plus_Min_Button;
