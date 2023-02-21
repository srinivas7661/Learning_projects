import React from "react";
import BaseComponent from '../baseComponent';
import { getCategories, addCategory} from "../../services/adminMicroService";
import Categories from './categories';
import { connect } from "react-redux";
import Utility, {dispatchAction} from "../../utility";
import {apiFailureConstants, apiSuccessConstants, eventConstants} from "../../constants";

class Category extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            categoryName:"",
            imageUrl:"",
            filterCategory: "",

        }
    };

    componentDidMount() {
        this.getCategory();
        this.handleAddCategory();   
    }

    handleAddCategory = async (data) => {
        const result = await addCategory(data);
        if (result) this.setState({ createCategory: result });
        this.getCategory();
        this.state.categoryName = "";
        this.state.imageUrl = "";
    }

    getCategory = async () => {
        this.props.dispatchAction(eventConstants.SHOW_LOADER);
        const res = await getCategories();
        this.props.dispatchAction(eventConstants.HIDE_LOADER);

        this.setState({ 
            category: res.categoriesContent ,
            filterCategory: res.categoriesContent,
        
        });
    };
    handlesearchCategory = (param) => {
        const data = this.state.category;
        const filterData = data.filter((item, i) => {
            return item.categoryName.toLowerCase().indexOf(param.toLowerCase()) !== -1;
            
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

    setImageUrl = (imageUrl) => {
        this.setState({imageUrl: imageUrl})
    };

    setCategoryName = (categoryName)=>{
        this.setState({categoryName: categoryName})
    };

    render() {
console.log("filterCategory",this.state.filterCategory)
        return (
            <>
            <Categories
            state={this.state}
            handleAddCategory={this.handleAddCategory}
            category = {this.state.category}
            setImageUrl={this.setImageUrl}
            setCategoryName={this.setCategoryName}
            handlesearchCategory={this.handlesearchCategory}
            filterCategory={this.state.filterCategory}
            />
            </>
        );
    };
};
const mapStateToProps = (state) => {
    return {user: state.user}
  }

export default connect(mapStateToProps,{dispatchAction})(Category);