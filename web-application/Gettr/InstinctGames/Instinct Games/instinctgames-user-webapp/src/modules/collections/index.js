import React, { Component } from "react";
import CollectionsComponent from "./collectionsComponent";
import { collectionsTab } from "../../constants/index";
import {
  getcollection,
  getTrendingCollection,
} from "../../services/adminConfigMicroservices";
import HeaderComponent from "../common/header";
import FooterComponent from "../common/footer";

class Collections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: collectionsTab[0],
      collectionsList: [],
      trendingCollectionsList: [],
    };
  }

  changeActiveTab = (index) => {
    this.setState(
      {
        activeTab: collectionsTab[index],
      },
      () => {
        if (this.state.activeTab !== collectionsTab[0]) {
          this.getCollectionList(this.state.activeTab);
        }
      }
    );
  };

  componentDidMount() {
    this.getCollectionList();
    this.getTrendingCollection();
  }

  getCollectionList = async (type) => {
    const responseCollectionList = await getcollection(false, type);
    this.setState({
      collectionsList: responseCollectionList.collections,
    });
  };

  getTrendingCollection = async () => {
    const responseTrendingCollectionList = await getTrendingCollection();
    this.setState({
      trendingCollectionsList: responseTrendingCollectionList,
    });
  };

  getFilterCollections = () => {
    const { activeTab, collectionsList, trendingCollectionsList } = this.state;
    if (activeTab !== collectionsTab[0]) {
      return collectionsList;
    }
    return trendingCollectionsList;
  };

  render() {
    const { activeTab } = this.state;
    const updatedList = this.getFilterCollections();
    return (
      <>
        <HeaderComponent />
        <CollectionsComponent
          activeTab={activeTab}
          collectionsList={updatedList}
          changeActiveTab={this.changeActiveTab}
        />
        <FooterComponent />
      </>
    );
  }
}

export default Collections;
