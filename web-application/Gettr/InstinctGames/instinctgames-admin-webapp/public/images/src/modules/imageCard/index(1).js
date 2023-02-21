import React from "react";
import BaseComponent from '../baseComponent'
import CardComponent from './card'
import Utils from "../../utility";

class Card extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    // componentDidMount() {

    // }
    

    render() {
        return (
            <CardComponent state={this.state}
                            />
        );
    }
}

export default Card;