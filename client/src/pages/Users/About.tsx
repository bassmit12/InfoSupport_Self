import React from "react";
import "../../styles/frontpage.css";
import Beef from "../../assets/About/Beef.jpg";
import Beefplate from "../../assets/About/BeefPlate.jpg";
import Kitchen from "../../assets/About/Kitchen.jpg";
import Salad from "../../assets/About/Salad.jpg";
import Salmon from "../../assets/About/Salmon.jpg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <div className="flex justify-center items-center my-10">
        <hr className="w-28 h-1 bg-primary border-0 rounded mx-4"></hr>
        <h1 className="text-4xl font-medium uppercase">About us</h1>
        <hr className="w-28 h-1 bg-primary border-0 rounded mx-4"></hr>
      </div>
      <div className="my-40 sm:mx-8">
        <div className="flex justify-center gap-x-40">
          <div className="flex flex-col gap-y-4">
            <div className="text-zinc-400 text-xl font-normal font-['Poppins'] sm:text-base">
              SPECIALTY OF THE HOUSE
            </div>
            <div className="text-black text-5xl font-semibold font-['Poppins'] sm:text-4xl">
              DISCOVER OUR
              <br />
              TASTY MEALS
            </div>
            <div className="text-zinc-400 text-xl font-normal font-['Poppins'] sm:text-base">
              Lorem ipsum dolor sit amet, consectetur <br />
              adipiscing elit. Quisque placerat metus et libero
              <br /> pulvinar, vel euismod felis tristique. Pellentesque
              ultrices{" "}
            </div>
            <Link to="/Menu">
              {" "}
              <button className="bg-primary w-2/3 text-white my-4 px-9 py-3 text-xl focus:outline-none poppins rounded-[10px] transform transition duration-300 hover:scale-105">
                Discover our Menu
              </button>
            </Link>
          </div>
          <div className="flex flex-row gap-x-4 sm:flex-col lg:flex-row">
            <div className="flex flex-col gap-y-4 mb-4">
              <img className="w-[440px] h-auto" src={Beefplate} />
              <div className="text-black text-xl font-semibold font-['Poppins']">
                OUR RESTAURANT STORY
              </div>
              <div className="text-zinc-400 text-xl font-normal font-['Poppins']">
                Lorem ipsum dolor sit amet, <br />
                adipiscing elit. Quisque placerat{" "}
              </div>
              <hr className="w-20 h-1 bg-primary border-0 rounded"></hr>
            </div>
            <div className="flex flex-col gap-y-4 mb-4">
              <img className="w-[440px] h-auto" src={Kitchen} />
              <div className="text-black text-xl font-semibold font-['Poppins']">
                ABOUT OUR MASTER CHEFS
              </div>
              <div className="text-zinc-400 text-xl font-normal font-['Poppins']">
                Lorem ipsum dolor sit amet, <br />
                adipiscing elit. Quisque placerat{" "}
              </div>
              <hr className="w-20 h-1 bg-primary border-0 rounded"></hr>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <img src={Salad} className="w-1/3" />
        <div className="w-1/3 bg-[url('src/assets/About/Beef.jpg')] bg-cover bg-center">
          <div className="w-full h-full flex justify-center flex-col gap-y-4 items-center backdrop-brightness-[.25]">
            <span className="text-white text-4xl w-1/2 text-center">
              ART OF FOOD!
            </span>
            <div className="text-center text-white text-base font-normal font-['Poppins']">
              Lorem ipsum dolor sit amet, <br />
              adipiscing elit. Quisque placerat{" "}
            </div>
            <button className=" bg-zinc-300 my-4 text-white w-48 h-12 bg-opacity-0 rounded-[10px] border border-white transform transition duration-300 hover:scale-105">
              BOOK NOW
            </button>
          </div>
        </div>
        <img src={Salmon} className="w-1/3 h-auto" />
      </div>
    </div>
  );
};

export default About;
