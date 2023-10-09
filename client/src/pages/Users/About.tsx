import React from "react";

const About = () => {
  return (
    <>
      <div className="w-[1440px] h-[1024px] relative bg-white">
        <div className="left-[640px] top-[83px] absolute text-black text-[32px] font-medium font-['Poppins']">
          ABOUT US
        </div>
        <div className="w-[451px] h-[334px] left-[176px] top-[226px] absolute">
          <div className="left-0 top-[30px] absolute text-black text-4xl font-semibold font-['Poppins']">
            DISCOVER OUR
            <br />
            TASTY MEALS
          </div>
          <div className="left-0 top-0 absolute text-zinc-400 text-base font-normal font-['Poppins']">
            SPECIALTY OF THE HOUSE
          </div>
          <div className="left-0 top-[156px] absolute text-zinc-400 text-base font-normal font-['Poppins']">
            Lorem ipsum dolor sit amet, consectetur <br />
            adipiscing elit. Quisque placerat metus et libero
            <br /> pulvinar, vel euismod felis tristique. Pellentesque ultrices{" "}
          </div>
          <div className="w-[251px] h-[65px] left-0 top-[269px] absolute">
            <div className="w-[251px] h-[65px] left-0 top-0 absolute bg-rose-600 rounded-[10px] border border-rose-600" />
            <div className="left-[36px] top-[17px] absolute text-center text-white text-xl font-normal font-['Poppins']">
              Discover our Menu
            </div>
          </div>
        </div>
        <div className="left-[1074px] top-[470px] absolute text-zinc-400 text-base font-normal font-['Poppins']">
          Lorem ipsum dolor sit amet, <br />
          adipiscing elit. Quisque placerat{" "}
        </div>
        <img
          className="w-[480px] h-[317.95px] left-[961px] top-[706px] absolute"
          src="https://via.placeholder.com/480x318"
        />
        <div className="w-[480px] h-80 left-[481px] top-[705px] absolute bg-black bg-opacity-80" />
        <img
          className="w-[480px] h-[318px] left-[1px] top-[706px] absolute"
          src="https://via.placeholder.com/480x318"
        />
        <div className="left-[596px] top-[762px] absolute text-white text-4xl font-semibold font-['Poppins']">
          ART OF FOOD!
        </div>
        <div className="left-[591px] top-[832px] absolute text-center text-white text-base font-normal font-['Poppins']">
          Lorem ipsum dolor sit amet, <br />
          adipiscing elit. Quisque placerat{" "}
        </div>
        <div className="w-[183px] h-[47px] left-[628px] top-[917px] absolute bg-zinc-300 bg-opacity-0 rounded-[10px] border border-white" />
        <div className="w-[135px] h-[22px] left-[654px] top-[929px] absolute text-center text-white text-base font-normal font-['Poppins']">
          BOOK NOW
        </div>
      </div>
    </>
  );
};

export default About;
