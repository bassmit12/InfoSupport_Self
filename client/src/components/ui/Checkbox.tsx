import React from "react";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center mb-4">
      <input
        id="default-checkbox"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  "
      />
      <label
        htmlFor="default-checkbox"
        className="ms-2 text-sm  text-gray-900 "
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
