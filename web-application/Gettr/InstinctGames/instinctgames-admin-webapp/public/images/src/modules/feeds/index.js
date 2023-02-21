import React from "react";
import FeedsComponent from "./feedsComponent";
import BaseComponent from "../baseComponent";
import { Row, Column } from "simple-flexbox";
import Header from "../common/header";
import FeedAndCommunityService from "../../services/feeds-community";
import Sidebar from "../common/sidebar";
import moment from "moment";
import Utility, { dispatchAction } from '../../utility'
import { connect } from 'react-redux';
import { eventConstants } from "../../constants";

class Feeds extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      menuType: 'icon',
      feedsList: [],
      feeds: [],
      publishedOptions: [],
      dateOptions: [],
      tableColumns: ["Photo", "Post Title", "Publish Date", "Publish By", "Views", "Status"]
    };
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };


  componentDidMount() {
    this.getFeeds()
  }


  getFeeds = async () => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER);

    let [error, feeds] = await Utility.parseResponse(new FeedAndCommunityService().getFeedsByStatus(
      { status: 'ACTIVE' }
    ));
    if (error) {
      // Utility.apiFailureToast(error && error.message ? error.message : error);
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      return;
    }
    this.props.dispatchAction(eventConstants.HIDE_LOADER);

    let dateOptions = [], publishedOptions = [];
    feeds = feeds.map(item => {
      let feed = {}

      feed['picture'] = <img id="feed-image" height="40px" src={item.picture} />
      feed['title'] = item.title
      feed['addedOn'] = moment(item.addedOn).format("HH:mm A DD MMM YYYY")
      feed['name'] = `${item.publishedBy?.name}`
      feed['views'] = item.views
      feed['status'] = item.status


      if (item && item.addedOn && (dateOptions.findIndex(ite => ite.name === moment(item.addedOn).format("DD MMM YYYY")) === -1)) {
        dateOptions.push({ name: moment(item.addedOn).format("DD MMM YYYY"), value: moment(item.addedOn).format("DD MMM YYYY") })
      }

      if (item.publishedBy && item.publishedBy.name && item.publishedBy.name.length && (publishedOptions.findIndex(ite => ite.name === item.publishedBy.name) === -1)) {
        publishedOptions.push({ name: item.publishedBy.name, value: item.publishedBy.name })
      }
      return { ...feed }
    })
    this.setState({ feeds, feedsList: feeds, publishedOptions, dateOptions })

  }


  onSearchChange = (value) => {
    value = String(value).toLowerCase()
    if (!value) {
      this.setState({ feeds: this.state.feedsList })
      return
    }

    let feeds = this.state.feedsList.filter(item => {
      return (item.title.toLowerCase().includes(value) || item.name.toLowerCase().includes(value) ||
        String(item.views).toLowerCase().includes(value) || item.status.toLowerCase().includes(value) ||
        item.addedOn.toLowerCase().includes(value))
    })

    this.setState({ feeds })

  }


  handleDropDownChange = (value, name) => {
    let feeds = []
    if (value === 'all') {
      feeds = this.state.feedsList
    } else if (name === 'addedOn') {
      feeds = this.state.feedsList.filter(item => {
        console.log(moment(item[name], ["HH:mm A DD MMM YYYY"]).format("DD MMM YYYY"))
        return moment(item[name], ["HH:mm A DD MMM YYYY"]).format("DD MMM YYYY") === value
      })
    } else {
      feeds = this.state.feedsList.filter(item => {
        return item[name] === value
      })
    }

    this.setState({ feeds })
  }



  render() {
    return (
      <Column className="w-100-per">
        <Column>
          <Header handleChange={this.handleChange} />
        </Column>
        <Row className="w-100-per">
          <Column>
            {" "}
            <Sidebar handleChange={this.handleChange} open={this.state.menu}
            // menuType={this.state.menuType}
            />{" "}
          </Column>
          <Column className="w-100-per">
            <FeedsComponent
              state={this.state}
              handleDropDownChange={this.handleDropDownChange}
              onSearchChange={this.onSearchChange}
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

export default connect(mapStateToProps, { dispatchAction })(Feeds);
