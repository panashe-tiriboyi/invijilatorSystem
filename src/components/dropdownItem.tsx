import React from "react";

const DropdownItem = ({ itemtype, itemname, handleSelect, form, itemId }) => {
  let inputData = "";
  const handleData = () => {
    if (itemtype == "teacher") {
      inputData = itemname;
      handleSelect(inputData, itemId);
    } else {
      inputData = itemname + " form " + form;
      handleSelect(inputData, itemId);
    }
  };

  const handleInput = () => {};

  return (
    <div className="DropdownItem">
      <button onClick={handleData}>{itemname}</button>
    </div>
  );
};

export default DropdownItem;
