import React from "react";

function FilterSideBarComponent(props) {
  return (
    <div
      className={`bg-black-60 ${props.width} text-white h-screen border border-l-0 border-b-0 border-primary-50 hidden mb-e:block`}
    >
      <div className="flex pl-4 pt-4 pr-4 justify-center cursor-pointer">
        <div onClick={props.toggleSideBar}>
          <img className="w-2.5" src="/images/arrow-right.svg" />
        </div>
      </div>
    </div>
  );
}

export default FilterSideBarComponent;
