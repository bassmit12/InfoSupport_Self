import React from "react";
import Plus_Min_Button from "../../components/Plus_Min_Button";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

const ItemDetails = () => {
  return (
    <>
      <Header />
      <section className="my-20 max-w-screen-xl mx-auto px-6">
        <div className="flex items-center justify-center space-x-6">
          <div className="flex-col flex-1">
            <h1 className="text-5xl mb-9 font-semibold">Borrelplank</h1>
            <p className="text-xl font-light">
              Savor the essence of Dutch culinary artistry with our Borrelplank.
              A tantalizing array of creamy Gouda, aged Edam, and bold Maasdam
              cheeses. Paired with crispy bitterballen, savory sausages, and
              vibrant pickles, it's a symphony of flavors. Complemented by fresh
              fruits and nuts, it's a perfect balance of textures. Elevate your
              experience with a chilled glass of Dutch beer or local wine. G
              ather your friends and dive into a world of indulgence.
              <br />
              <br />
              Cheers to the ultimate Dutch delight!
            </p>
            <div className="mt-10 flex flex-row ">
              <h2 className="text-gray-900 poppins text-2xl font-semibold ">
                $9.99
              </h2>
              <Plus_Min_Button />
            </div>
            <Link to="/TransactionPage">
              <button className="bg-primary text-white px-8 py-3 focus:outline-none poppins rounded-full mt-8 transform transition duration-300 hover:scale-105 flex flex-row">
                <div className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    fill="#ffffff"
                  >
                    <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                  </svg>
                </div>
                <h1>Order now</h1>
              </button>
            </Link>
          </div>
          <div className="flex-row flex-1">
            <img src="https://joflow.nl/cdn/shop/products/Voorfoto_3bc2c4c8-01a8-4565-98f9-dadbbbea9e41_1200x1200.jpg?v=1657801731" />
          </div>
        </div>
      </section>
    </>
  );
};

export default ItemDetails;
