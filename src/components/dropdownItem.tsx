import React from "react";

const DropdownItem = ({ itemname, handleSelect }) => {
  const handleData = (data) => {
    handleSelect(data);
  };

  return (
    <div className="DropdownItem">
      <button onClick={() => handleData(itemname)}>{itemname}</button>
    </div>
  );
};

export default DropdownItem;
