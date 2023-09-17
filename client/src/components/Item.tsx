import React from "react";
import Button from "./Button_count";

const Item = (props: any) => {
  return (
    <div className="">
      <div className="px-4 py-2 bg-red-500">
        <h1 className="text-xl font-bold">{props.name}</h1>
        <Button />
      </div>
    </div>
  );
};

export default Item;
