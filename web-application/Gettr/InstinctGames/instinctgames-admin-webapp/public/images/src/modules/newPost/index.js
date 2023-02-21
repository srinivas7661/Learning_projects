import React from "react";
import NewPostComponent from "./newPostComponent";
import BaseComponent from "../baseComponent";
import { Row, Column } from "simple-flexbox";
import Header from "../common/header";
import Sidebar from "../common/sidebar";
import FeedAndCommunityService from "../../services/feeds-community";
import Utility, { dispatchAction } from '../../utility'
import { connect } from 'react-redux';
import { cookiesConstants, eventConstants } from "../../constants";
import { sessionManager } from "../../managers/sessionManager";
import { history } from "../../managers/history";



class NewPost extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      drawer: false,
      title: '',
      content: "",
      picture: "",
      file: null,
      fileName: '',
      drafted: false,
      draftedFeed: {}
    };
  }

  componentDidMount() {
    this.getDraftedFeed()
  }

  getDraftedFeed = async () => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    let user = sessionManager.getDataFromCookies(cookiesConstants.USER_DETAIL);
    user = JSON.parse(user)

    let [error, feeds] = await Utility.parseResponse(new FeedAndCommunityService().getDraftedFeed({
      userId: user.userId
    }));
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    if (feeds && feeds.length) {
      let fileName = feeds[0].picture ? feeds[0].picture.split("/")[feeds[0].picture.split('/').length - 1] : ''
      this.setState({
        title: feeds[0].title,
        content: feeds[0].content,
        picture: feeds[0].picture,
        fileName,
        drafted: true,
        draftedFeed: feeds[0]
      })
    }
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    });
    if (name === "content") {
      document.getElementById('content').innerHTML = value
    }
    if (value && name === 'file') {
      let fileReader = new FileReader()
      fileReader.readAsDataURL(value)
      fileReader.onload = (event) => {
        this.setState({ picture: event.target.result, fileName: '' })
      }
    } else if (!value && name === 'file') {
      this.setState({ file: null, picture: null })
      return
    }

  };

  updateFeed = async (save) => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    this.setState({ drawer: false })
    let picture = this.state.picture
    if (this.state.file) {
      picture = await this.uploadFile()
    }

    let request = {
      "content": this.state.content,
      picture,
      save: !save,
      id: this.state.draftedFeed._id
    }

    let [error, feeds] = await Utility.parseResponse(new FeedAndCommunityService().updateFeed(
      request
    ));
    if (error) {
      Utility.apiFailureToast(error && error.message ? error.message : error);
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      return;
    }
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
  }

  addFeeds = async (saveAsDraft = false) => {
    if (!saveAsDraft) {
      if (!this.state.content) {
        Utility.apiFailureToast('Please provide a content');
        return
      }
      else if (!this.state.file && !this.state.picture) {
        Utility.apiFailureToast('Please provide a picture');
        return
      }

    }
    if (!this.state.title) {
      Utility.apiFailureToast('Please provide a title for the feed');
      return
    }
    if (this.state.drafted) {
      await this.updateFeed(saveAsDraft)
      return
    }
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    this.setState({ drawer: false })
    let picture = await this.uploadFile()
    let userDetails = sessionManager.getDataFromCookies(cookiesConstants.USER_DETAIL)
    userDetails = JSON.parse(userDetails)
    let request = {
      "publishedBy": {
        'userId': userDetails.userId,
        'name': `${userDetails.firstName} ${userDetails.lastName}`,
        'email': userDetails.email,
        'profilePic': userDetails.profilePic,
      },
      saveAsDraft,
      "title": this.state.title,
      "content": this.state.content,
      picture,
      "category": "Feed"
    }

    let [error, feeds] = await Utility.parseResponse(new FeedAndCommunityService().addFeed(
      request
    ));
    if (error) {
      Utility.apiFailureToast(error && error.message ? error.message : error);
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      return;
    }
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    Utility.apiSuccessToast("Feed added successfully");
    history.push('/feeds')
  }

  uploadFile = async () => {
    if (!this.state.file) {
      return ''
    }
    let formdata = new FormData()
    formdata.append('images', this.state.file)
    try {
      let uploadRes = await Utility.uploadImage(formdata);
      return `${process.env.REACT_APP_FILE_UPLOAD_SERVICE}/get?fileName=${process.env.REACT_APP_S3_BUCKET}/${uploadRes.sourceFileName}`
    } catch (error) {
      Utility.apiFailureToast(error)
    }
  }

  render() {
    return (
      <Column>
        <Column>
          <Header handleChange={this.handleChange} />
        </Column>
        <Row>
          <Column>
            <Sidebar handleChange={this.handleChange}
              open={this.state.menu}
            />
          </Column>
          <Column className="w-810-px w-100-pr">
            <NewPostComponent
              state={this.state}
              handleChange={this.handleChange}
              addFeeds={this.addFeeds}
            />
          </Column>
        </Row>
      </Column>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps, { dispatchAction })(NewPost);