// LoadingSpinner.tsx
import React from "react";
import { ClipLoader } from "react-spinners";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 20,
  color = "#ffffff",
}) => {
  return <ClipLoader size={size} color={color} />;
};

export default LoadingSpinner;
