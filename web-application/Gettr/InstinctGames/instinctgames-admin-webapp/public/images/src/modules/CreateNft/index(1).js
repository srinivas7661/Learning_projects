import React from "react";
import BaseComponent from "../baseComponent";
import CreateNft from "./CreateNft";

class FirstPageNft extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <>
      <CreateNft />
      </>
    );
  }
}

export default FirstPageNft;
