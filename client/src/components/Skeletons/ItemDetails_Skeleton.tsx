const ItemDetails_Skeleton = () => {
  return (
    <>
      <div className="animate-pulse flex justify-center items-center sm:my-12 md:my-0 lg:my-0">
        <section className="max-w-screen-2xl px-6">
          <div className="flex flex-col justify-center items-start h-screen w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-20 w-full">
              <div className="order-2 md:order-1 lg:order-1 flex flex-col justify-center items-center md:items-start lg:items-start">
                <h1 className="bg-gray-300 rounded-md text-3xl lg:text-4xl font-semibold poppins pb-4 h-12 w-full"></h1>
                <div className="bg-gray-200 rounded-full h-6 w-1/3 my-4"></div>
                <div className="bg-gray-200 h-40 w-full rounded-md my-4"></div>
                <div className="bg-gray-200 h-12 w-full rounded-md my-4"></div>
                <div className="flex items-center justify-center md:justify-start lg:justify-start space-x-6 pt-8 w-full">
                  <div className="bg-gray-300 h-12 w-36 rounded-md"></div>
                  <div className="bg-gray-200 h-10 w-36 rounded-md"></div>
                </div>
                <div className="mt-8 flex items-center justify-center md:justify-start lg:justify-start w-full">
                  <div className="bg-gray-400 h-12 w-2/3 rounded-full"></div>
                </div>
              </div>
              <div className="order-1 md:order-2 lg:order-2">
                <div className="bg-gray-200 w-96 h-full rounded-md"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ItemDetails_Skeleton;
