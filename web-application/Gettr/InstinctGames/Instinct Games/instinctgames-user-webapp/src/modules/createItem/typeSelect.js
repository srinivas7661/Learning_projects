import { getNetworkType } from "caver-js";
import React from "react";
const data = [
  { id: 0, label: "Action" },
  { id: 1, label: "Adventure" },
  { id: 2, label: "CCG" },
];
function TypeSelect(props) {
  const [iconShow, setIconShow] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState("");
  const [items, setItem] = React.useState(data);
  const iconChange = () => {
    setIconShow(!iconShow);
  };
  const [isActive, setIsActive] = React.useState(false);
  const handleItemClick = (id) => {
    selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
    props.getType(id);
  };
  return (
    <div
      className="xr:h-2.3vw h-5.5 tablet:h-6.75 border rounded relative border-primary-50 bg-black-300 flex flex-col justify-center"
      onClick={iconChange}
    >
      <div
        className={`${selectedItem?"py-1 px-3 text-ft-10 xr:text-ft4 cursor-pointer flex items-center justify-between text-white":"py-1 px-3 text-ft-10 xr:text-ft4 cursor-pointer flex items-center justify-between text-grey-110"} text-truncate`}
        onClick={(e) => setIsActive(!isActive)}
      >
        {selectedItem
          ? items.find((item) => item.label == selectedItem).label
          : "Select Type"}
        {!iconShow ? (
          <img src="/images/Dropdown.svg" />
        ) : (
          <img src="/images/Dropdown-up.svg" />
        )}
      </div>
      {isActive && (
        <div
          className=" w-28.75 absolute left-0 bg-black-400 border rounded border-primary-50 bg-gray-200 text-white top-12.25 z-250"
          onClick={(e) => setIsActive(!isActive)}
        >
          {items.map((item) => (
            <div
              className=" cursor-pointer p-2.5 text-white border-b border-primary-50 text-ft-10 xr:text-ft4"
              onClick={(e) => {
                handleItemClick(e.target.id);
                props.setTypeError("");
              }}
              id={item.label}
            >
              <span
                className={`dropdown-item-dot ${
                  item.id == selectedItem && "selected"
                }`}
              ></span>
              {item.label}
              <br />
              {item.topic}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TypeSelect;
