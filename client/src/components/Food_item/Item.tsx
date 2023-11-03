import React from "react";
import Item_Skeleton from "./Item_Skeleton";
import { Link } from "react-router-dom";

interface ItemProps {
  image: string;
  title: string;
  descriptionShort: string;
  price: number;
  foodType: string;
}

const Item = ({
  image,
  title,
  descriptionShort,
  price,
  foodType,
}: ItemProps) => {
  return (
    <Link to="/details">
      <div className="bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl hover:scale-105 p-4 rounded-lg relative">
        <span className="bg-red-100 border border-red-500 rounded-full text-primary text-sm poppins px-4 py-1 inline-block mb-4 ">
          {foodType}
        </span>
        <img
          className="w-64 h-48 mx-auto transform transition duration-300 hover:scale-105"
          src={image}
          alt=""
        />
        <div className="flex flex-col items-center my-3 space-y-4">
          <h1 className="text-gray-900 poppins text-lg">{title}</h1>
          <p className="text-gray-500 poppins text-sm text-center h-14">
            {descriptionShort}
          </p>
          <h2 className="text-gray-900 poppins text-2xl font-semibold">
            ${price}
          </h2>

          <button className="bg-primary text-white px-8 py-2 focus:outline-none poppins rounded-full transform transition duration-300 hover:scale-105 mt-10">
            Order Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Item;
