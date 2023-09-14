import { useState } from 'react';

const Button_count = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p className="mb-4">amount: {count}</p>
      <button
        className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setCount(count + 1)}
      >
        +1
      </button>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={() => setCount(count - 1)}
      >
        -1
      </button>
    </div>
  );
};

export default Button_count;
