import React from "react";

function PriceSelect(props) {
  const items = props?.tokens;
  const [iconShow, setIconShow] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState("");
  console.log(selectedItem, "selected");
  // const [items, setItem] = React.useState(data);
  const iconChange = () => {
    setIconShow(!iconShow);
  };
  const [isActive, setIsActive] = React.useState(false);
  const handleItemClick = (id) => {
    selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
    props.getPrice(id);
  };
  return (
    <div
      className="tb:h-2.3vw h-5.5 border rounded-r relative border-primary-50 bg-black-300 flex items-center w-1/4 tablet:h-6.75 mt-mex"
      onClick={iconChange}
    >
      <div
        className={selectedItem?"py-1 px-3 h-2.3vw text-ft-10 tb:text-ft4 cursor-pointer flex items-center justify-around text-white w-full":"py-1 px-3 h-2.3vw text-ft-10 tb:text-ft4 cursor-pointer flex items-center justify-around text-grey-110 w-full"}
        onClick={(e) => setIsActive(!isActive)}
      >
        {selectedItem
          ? items.find((item) => item?.tokenName == selectedItem)?.tokenSymbol
          : "BNB"}
        {!iconShow ? (
          <img src="/images/Dropdown.svg" />
        ) : (
          <img src="/images/arrow-up.svg" className="h-1.75" />
        )}
      </div>
      {isActive && (
        <div
          className="text-ft-10 tb:text-ft4 w-max absolute left-0 bg-black-300 border rounded border-primary-50 bg-gray-200 text-white top-10"
          onClick={(e) => setIsActive(!isActive)}
        >
          {items.map((item) => (
            <div
              className=" cursor-pointer text-white border-b border-primary-50 py-1 tb:py-2.5 px-4"
              onClick={(e) => handleItemClick(e.target.id)}
              id={item?.tokenName}
            >
              <span
                className={`dropdown-item-dot ${
                  item?._id == selectedItem && "selected"
                }`}
              ></span>
              {item?.tokenSymbol}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PriceSelect;
