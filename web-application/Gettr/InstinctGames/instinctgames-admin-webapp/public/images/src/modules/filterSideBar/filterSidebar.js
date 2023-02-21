import React from "react";
import BaseComponent from "../baseComponent";
import "../../assets/styles/custom.css";
import Filter from "../../assets/SVGs/Filter.svg";
import search from "../../assets/SVGs/search.svg";
import MinMax from "./minMaxValidation";

function FilterSidebar(props) {
  const { handleSearch, handleSearchCollection } = props;

  return (
    <div>
      {props.state.show ? (
        <div
          id="mySidebar"
          className="w3-sidebar w3-bar-block w3-card w3-animate-left"
        >
          <div className="filter_main">
            <div className="filter_icon">
              <img src={Filter} alt="body" />
              <p>Filters</p>
            </div>
            <div className="close_sidebar">
              <p onClick={() => props.changeStateVariable("show", false)}>X</p>
            </div>
          </div>
          <div className="divided_line"></div>
          <div className="common_heading">
            <p style={{ marginBottom: 0 }}>Price</p>
          </div>
          <MinMax />
          <div className="divided_line"></div>
          <div className="common_heading">
            <p>Categories</p>
          </div>
          <div className="search_common">
            <input
              type="text"
              onChange={(e) => handleSearch(e.target.value.substr(0, 20))}
              placeholder="Search"
            />
            <img src={search} alt="body" />
          </div>
          <div className="api_list">
            {props.state.filterCategory && props.state.filterCategory.length > 0
              ? props.state.filterCategory.map((name) => (
                  <p style={{ color: "#ffffff" }}>
                    {name.categoryName}
                    {name.imageurl}
                  </p>
                ))
              : ""}
          </div>
          <div className="divided_line"></div>
          <div className="common_heading">
            <p>Collections</p>
          </div>

          <div className="search_common">
            <input
              type="text"
              onChange={(e) =>
                handleSearchCollection(e.target.value.substr(0, 20))
              }
              placeholder="Search"
            />
            <img src={search} alt="body" />
          </div>
          <div className="api_list">
            {props.state.filterCollection &&
            props.state.filterCollection.length > 0
              ? props.state.filterCollection.map((name) => (
                  <p style={{ color: "#ffffff" }}>{name.name}</p>
                ))
              : ""}
          </div>

          <div className="divided_line"></div>
        </div>
      ) : (
        <div className="homepage_filter">
          <p onClick={() => props.changeStateVariable("show", true)}>
            <img src={Filter} alt="body" />
          </p>
        </div>
      )}
    </div>
  );
}

export default FilterSidebar;
