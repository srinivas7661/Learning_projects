import React from "react";
import BaseComponent from "../baseComponent";

import FilterSidebar from "./filterSidebar";

import {
  getcategory,
  getcollection,
} from "../../services/adminConfigMicroservices";

class Sidebar extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      collection: [],
      filterCategory: "",
      filterCollection: "",
      show: true,
      max: "",
      min: "",
    };
  }

  componentDidMount() {
    getcategory().then(
      (result) => {
        this.setState({
          category: result,
          filterCategory: result,
        });
      },
      (error) => {
        this.setState({
          error,
        });
      }
    );
    getcollection().then(
      (result) => {
        this.setState({
          collection: result,
          filterCollection: result,
        });
      },
      (error) => {
        this.setState({
          error,
        });
      }
    );
  }
  // SEARCH BY NAME FILTER STORAGE
  handleSearch = (param) => {
    const data = this.state.category;
    const filterData = data.filter((item, i) => {
      return (
        item.categoryName.toLowerCase().indexOf(param.toLowerCase()) !== -1
      );
    });
    if (param.length > 0) {
      this.setState({
        filterCategory: filterData,
      });
    } else {
      this.setState({
        filterCategory: data,
      });
    }
  };
  handleSearchCollection = (param) => {
    const data = this.state.collection;
    const filterData = data.filter((item, i) => {
      return item.name.toLowerCase().indexOf(param.toLowerCase()) !== -1;
    });
    if (param.length > 0) {
      this.setState({
        filterCollection: filterData,
      });
    } else {
      this.setState({
        filterCollection: data,
      });
    }
  };

  changeStateVariable = (key, value) => {
    this.setState({ [key]: value });
  };

  render() {
    console.log("state", this.state);
    return (
      <FilterSidebar
        handleSearch={this.handleSearch}
        handleSearchCollection={this.handleSearchCollection}
        changeStateVariable={this.changeStateVariable}
        state={this.state}
      />
    );
  }
}

export default Sidebar;
