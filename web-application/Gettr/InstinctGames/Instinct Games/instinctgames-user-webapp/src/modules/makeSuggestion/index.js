import React, { Component } from "react";
import MakeSuggestionComponent from "./makeSuggestionComponent";
import { contentService, ContentService } from "../../services";
import Utils from "../../utility";
import { credsConstants, validationsMessages } from "../../constants";
import CommonToasts from "../../common/components/commonToasts";
import Header from "../common/header";
import Footer from "../common/footer";

class MakeSuggestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      comment: "",
      topic: "",
    };
  }

  requestSuggestionServiceEmail = async () => {
    const { name, email, topic, comment } = this.state;
    try {
      let data = {
        name: name,
        to: credsConstants.RECIEVER_EMAIL_ADDRESS,
        from: credsConstants.SENDER_EMAIL_ADDRESS,
        subject: credsConstants.SUGGESTIONS_SUBJECT,
        title: credsConstants.TEXT_TYPE,
        text: credsConstants.TEXT_TYPE,
        email: email,
        topic: topic,
        comment: comment,
        sentFromEmail: credsConstants.SENDER_EMAIL_ADDRESS,
        postedBy: credsConstants.SENDER_EMAIL_ADDRESS,
        postedTo: credsConstants.RECIEVER_EMAIL_ADDRESS,
      };
      const response = await contentService.makeSuggestionService(data);
      if (response === true) {
        CommonToasts.successToast(validationsMessages.MAIL_SENT_SUCCESSFULLY);
        this.setState({
          name: "",
          email: "",
          comment: "",
          topic: "",
        });
      }
    } catch (error) {
      return new Error({ msg: "Sorry data is not sent" });
    }
  };

  onSubmission = (value) => {
    const { name, email, comment, topic } = this.state;
    value.preventDefault();
    if (
      name?.length !== 0 &&
      email?.length !== 0 &&
      topic?.length !== 0 &&
      comment?.length !== 0
    ) {
      Utils.validateEmail(email) === true
        ? this.requestSuggestionServiceEmail()
        : CommonToasts.errorToast(validationsMessages.EMAIL_VALIDATION);
    } else {
      CommonToasts.errorToast(validationsMessages.FORM_FIELD_ERROR);
    }
  };

  changeFormValues = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  render() {
    return (
      <>
        <Header />
        <MakeSuggestionComponent
          state={this.state}
          onSubmission={this.onSubmission}
          changeFormValues={this.changeFormValues}
        />
        <Footer />
      </>
    );
  }
}

export default MakeSuggestion;
