import React from "react";
import BaseComponent from '../baseComponent';
import { Row, Column } from 'simple-flexbox';
import Header from '../common/header';
import Sidebar from '../common/sidebar';
import { connect } from 'react-redux';
import Utility, { dispatchAction } from '../../utility';
import PostComponent from './component';
import { history } from "../../managers/history";
import { eventConstants, statusConstants } from "../../constants";
import moment from 'moment';
import FeedAndCommunityService from "../../services/feeds-community";

class Posts extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            drawer: false,
            menu: false,
            tableColumns: ['', 'Post Title', 'Posted By', 'Date and Time', 'Like', 'Comments', 'Status', ''],
            posts: [],
            postsList: [],
            postTitle: "",
            selectedPost: {
                title: "",
                picture: "",
                id: "",
                content: ""
            },
            publishedOptions: [],
            dateOptions: []
        };
    }


    componentDidMount() {
        let url = new URL(window.location.href);
        let splitRes = url.pathname.split('/')
        if (splitRes.length < 2) {
            history.push("/community")
        }
        const postTitle = splitRes[2]
        this.setState({ postTitle })
        this.getPosts(postTitle)
    }


    getPosts = async (category) => {
        this.props.dispatchAction(eventConstants.SHOW_LOADER, true)
        let [error, posts] = await Utility.parseResponse(new FeedAndCommunityService().getPostByCategory({
            category
        }))
        if (error) {
            this.props.dispatchAction(eventConstants.HIDE_LOADER, false)
            console.log(error)
            return
        }
        this.props.dispatchAction(eventConstants.HIDE_LOADER, false)
        let dateOptions = [], publishedOptions = [];
        posts = posts.map(item => {
            let post = {}

            post['picture'] = <img height="40px" src={item.picture} />
            post['title'] = item.title
            post['name'] = `${item.publishedBy?.name}`
            post['addedOn'] = moment(item.addedOn).format("HH:mm A, D MMM YYYY")
            post['likes'] = item.likes?.length
            post['comments'] = item.comments?.length
            post['status'] = item.status ? item.status : ''
            post['flags'] = item.status === statusConstants.PENDING ?
                <button
                    onClick={() => this.handleReviewClick({ id: item._id, title: item.title, picture: item.picture, content: item.content })}
                    className="review-button">Review</button> : item.flags.join(',')


            if (item && item.addedOn && (dateOptions.findIndex(ite => ite.name === moment(item.addedOn).format("DD MMM YYYY")) === -1)) {
                dateOptions.push({ name: moment(item.addedOn).format("DD MMM YYYY"), value: moment(item.addedOn).format("DD MMM YYYY") })
            }

            if (item.publishedBy && item.publishedBy.name && item.publishedBy.name.length && (publishedOptions.findIndex(ite => ite.name === item.publishedBy.name) === -1)) {
                publishedOptions.push({ name: item.publishedBy.name, value: item.publishedBy.name })
            }
            return { ...post }
        })
        this.setState({ posts, postsList: posts, publishedOptions, dateOptions })

    }

    acceptPost = async (id) => {
        this.props.dispatchAction(eventConstants.SHOW_LOADER, true)
        let [error, posts] = await Utility.parseResponse(new FeedAndCommunityService().acceptPost({
            id
        }))
        if (error) {
            this.props.dispatchAction(eventConstants.HIDE_LOADER, false)
            console.log(error)
            return
        }
        this.props.dispatchAction(eventConstants.HIDE_LOADER, false)
        this.setState({ drawer: false })
        Utility.apiSuccessToast('Post published successfully')
        this.componentDidMount()
    }


    rejectPost = async (id) => {
        this.props.dispatchAction(eventConstants.SHOW_LOADER, true)
        let [error, posts] = await Utility.parseResponse(new FeedAndCommunityService().rejectPost({
            id
        }))
        if (error) {
            this.props.dispatchAction(eventConstants.HIDE_LOADER, false)
            console.log(error)
            return
        }
        this.props.dispatchAction(eventConstants.HIDE_LOADER, false)
        this.setState({ drawer: false })
        Utility.apiSuccessToast('Post rejected successfully')
        this.componentDidMount()
    }


    handleReviewClick = (selectedPost) => {
        this.setState({ selectedPost, drawer: true })
    }

    onSearchChange = (value) => {
        value = String(value).toLowerCase()
        if (!value) {
            this.setState({ posts: this.state.postsList })
            return
        }

        let posts = this.state.postsList.filter(item => {
            return (item.title.toLowerCase().includes(value) || item.name.toLowerCase().includes(value) ||
                String(item.likes).toLowerCase().includes(value) || String(item.comments).toLowerCase().includes(value) || item.status.toLowerCase().includes(value) ||
                item.addedOn.toLowerCase().includes(value))
        })

        this.setState({ posts })

    }


    handleDropDownChange = (value, name) => {
        let posts = []
        if (value === 'all') {
            posts = this.state.postsList
        } else if (name === 'addedOn') {
            posts = this.state.postsList.filter(item => {
                console.log(moment(item[name], ["HH:mm A, D MMM YYYY"]).format("DD MMM YYYY"))
                return moment(item[name], ["HH:mm A, D MMM YYYY"]).format("DD MMM YYYY") === value
            })
        } else {
            posts = this.state.postsList.filter(item => {
                return item[name] === value
            })
        }

        this.setState({ posts })
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value,
        });
    };
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
                    <Column className="w-100-per">
                        <PostComponent
                            acceptPost={this.acceptPost}
                            rejectPost={this.rejectPost}
                            onSearchChange={this.onSearchChange}
                            handleChange={this.handleChange}
                            handleDropDownChange={this.handleDropDownChange}
                            state={this.state} />
                    </Column>
                </Row>
            </Column>
        );
    }
}

const mapStateToProps = (state) => {
    return { user: state.user }
}

export default connect(mapStateToProps, { dispatchAction })(Posts);