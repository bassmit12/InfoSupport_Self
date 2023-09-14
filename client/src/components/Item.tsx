import React from "react";
import Button from "./Button_count";

const Item = (props: any) => {
  return (
    <div>
      <h1 className="text-xl font-bold">{props.name}</h1>
      <Button />
    </div>
  );
};

export default Item;
