import React, { useState } from "react";
import Checkbox from "../ui/Checkbox";

interface IngredientFilterProps {
  allIngredients: string[];
  selectedIngredients: string[];
  onSelectIngredient: (ingredient: string) => void;
}

const IngredientFilter: React.FC<IngredientFilterProps> = ({
  allIngredients,
  selectedIngredients,
  onSelectIngredient,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilterList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        id="ingredientDropdownButton"
        onClick={toggleFilterList}
        type="button"
        className="menu_tab poppins border px-10 border-gray-100 rounded-full py-2 text-center inline-flex items-center"
      >
        Select allergies
        <svg
          className="w-2.5 h-2.5 ms-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 10 6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1l4 4 4-4"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div
          id="ingredientDropdown"
          className="z-10 absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
        >
          <ul
            className="py-2 text-sm"
            aria-labelledby="ingredientDropdownButton"
          >
            {allIngredients.map((ingredient) => (
              <li key={ingredient}>
                <Checkbox
                  label={ingredient}
                  checked={selectedIngredients.includes(ingredient)}
                  onChange={() => onSelectIngredient(ingredient)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IngredientFilter;
