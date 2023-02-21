import React from "react";

function CollectionSelect(props) {
  const items = props?.collection;

  const [iconShow, setIconShow] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState("");

  const iconChange = () => {
    setIconShow(!iconShow);
  };
  const [isActive, setIsActive] = React.useState(false);
  const handleItemClick = (_id) => {
    selectedItem == _id ? setSelectedItem(null) : setSelectedItem(_id);
  };

  const handleIdClick = (selectedItem) => {
    props.getCollection(selectedItem);
  };

  return (
    <div
      className="xr:h-2.3vw h-5.5 tablet:h-6.75 border rounded relative border-primary-50 bg-black-300 flex flex-col justify-center"
      onClick={iconChange}
    >
      <div
        className={`${selectedItem?"text-white  py-1 px-3 text-ft-10 xr:text-ft4 cursor-pointer flex items-center justify-between h-2.3vw": "py-1 px-3 text-ft-10 xr:text-ft4 cursor-pointer flex items-center justify-between text-grey-110 h-2.3vw"} text-truncate`}
        onClick={(e) => setIsActive(!isActive)}
      >
        
        {selectedItem
          ? items.find((item) => item.name == selectedItem).name
          : "Add to collection "}
        {!iconShow ? (
          <img src="/images/Dropdown.svg" />
        ) : (
          <img src="/images/Dropdown-up.svg" />
        )}
      </div>
      {isActive && (
        <div
          className=" w-full h-58 overflow-y-scroll scrollbar absolute left-0 bg-black-400 border rounded border-primary-50 bg-gray-200 text-white top-12.25 z-10"
          onClick={(e) => setIsActive(!isActive)}
        >
          {items.map((item, index) => (
            <div
              className=" cursor-pointer p-2.5 text-white border-b text-ft-10 xr:text-ft4 border-primary-50"
              onClick={(e) => {
                handleItemClick(e.target.id);
                handleIdClick(index);
                props.setCollectionError("");
              }}
              id={item.name}
            >
              <span
                className={`dropdown-item-dot ${
                  item.name == selectedItem && "selected"
                }`}
              ></span>
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CollectionSelect;
