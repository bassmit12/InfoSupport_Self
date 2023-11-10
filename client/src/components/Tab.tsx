const Tab = () => {
  return (
    <div className="p-5">
      <div className="">
        <div className="red rounded-t-3xl p-4 border-x border-t border-slate-300">
          <div className="flex text-white justify-between">
            <div className="flex items-center gap-4">
              <img src="/src/assets/Table.png" className="h-8 invert" />
              <p>Table 1</p>
            </div>
            <div className="flex items-center gap-3">
              <img src="/src/assets/Hourglass.png" className="h-8 invert" />
              <p>17:46</p>
            </div>
          </div>
        </div>
        <div className="white p-5 border-x border-slate-300">
          <ul>
            <li>
              <div className="flex justify-between items-center mb-2">
                <p>1 x Coca cola</p>
                <p>€3.25</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p>4 x Borrelplank</p>
                <p>€65.00</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p>2 x Soep</p>
                <p>€8.55</p>
              </div>
            </li>
            <li>
              <div className="flex justify-between items-center border-t-2 border-black border-dashed pt-2">
                <p>Totaal</p>
                <p>€76.80</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="white rounded-b-3xl p-5 flex justify-end text-white gap-4 border-x border-b border-slate-300">
          <button className="red px-5 py-1 rounded-full">Edit</button>
          <button className="red px-5 py-1 rounded-full">Pay</button>
        </div>
      </div>
    </div>
  );
};

export default Tab;
