import Tab from "../../components/Tab";

function KitchenPage() {
  return (
    <div className="gray h-screen p-20">
      <div className="grid gray gap-20 grid-cols-3">
        <div className="col-span-1">
          <Tab />
        </div>
        <div className="col-span-1">
          <Tab />
        </div>
        <div className="col-span-1">
          <Tab />
        </div>
      </div>
    </div>
  );
}

export default KitchenPage;
