import React from "react";
import Transaction from "../../components/Transaction";
import Header from "../../components/Header";

const TransactionPage = () => {
  return (
    <>
      <Header />
      <section className="my-20 max-w-screen-xl mx-auto px-6">
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />

        <div className="flex flex-row justify-between items-center">
          <button className="bg-primary text-white px-9 py-3 text-xl focus:outline-none poppins rounded-full transform transition duration-300 hover:scale-105">
            Order Now
          </button>
          <h2 className="text-gray-900 poppins text-4xl font-medium">
            Total: $9.99
          </h2>
        </div>
      </section>
    </>
  );
};

export default TransactionPage;
