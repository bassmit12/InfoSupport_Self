import { useState } from 'react';

const Button_count = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>
        <p className="mb-4">amount: {count}</p>
        <button
          className="px-4 py-2 rounded border border-black mr-1"
          onClick={() => setCount(count - 1)}
        >
          -1
        </button>
        <button
          className="mr-2 px-4 py-2 rounded border border-black"
          onClick={() => setCount(count + 1)}
        >
          +1
        </button>
      </div>
    </div>
  );
};

export default Button_count;
