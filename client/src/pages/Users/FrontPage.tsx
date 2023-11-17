import "../../styles/frontpage.css";
import { Link } from "react-router-dom";
import About from "./About";

const FrontPage = () => {
  return (
    <>
      <div className="bg-image h-screen flex items-center justify-center">
        <div className="bg-image-cover absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed">
          <div className="flex h-full items-center justify-center">
            <div className="text-white flex-col items-center justify-center text-center">
              <h4 className="mb-6 text-4xl font-semibold">Welcome to</h4>
              <h2 className="mb-10 text-8xl font-semibold">MenuMasters</h2>
              <h4 className="mb-6 text-4xl font-semibold">
                &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
              </h4>
              <Link to="/Menu">
                <button
                  type="button"
                  className="rounded-md border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-xl font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Discover our Menu
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <About />
    </>
  );
};

export default FrontPage;
