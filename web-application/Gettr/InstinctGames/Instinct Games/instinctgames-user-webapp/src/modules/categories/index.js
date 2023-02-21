import React, { Component } from "react";
import HeaderComponent from "../common/header";
import FooterComponent from "../common/footer";
import Category from "./category";
import { getCategories } from "../../services";
import { dispatchAction } from "../../utility";
import { connect } from "react-redux";
import { eventConstants } from "../../constants";
class CategoriesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    await this.getCategories();
  }

  getCategories = async () => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const res = await getCategories();
    this.props.dispatchAction(eventConstants.HIDE_LOADER);

    this.setState({ category: res.categoriesContent });
    
  };
  render() {
    return (
      <>
        <HeaderComponent />
        <Category category={this.state.category} />
        <FooterComponent />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return { currency: state.currency, wallet: state.wallet };
};
export default connect(mapStateToProps, { dispatchAction })(CategoriesComponent);
