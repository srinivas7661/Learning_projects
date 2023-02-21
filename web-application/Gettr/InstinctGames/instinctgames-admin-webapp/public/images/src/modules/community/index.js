import React from "react";
import BaseComponent from '../baseComponent';
import { Row, Column } from 'simple-flexbox';
import Header from '../common/header';
import Sidebar from '../common/sidebar';
import { connect } from "react-redux";
import ManageCommunity from './manage-community'
import Utility, { dispatchAction } from '../../utility';
import FeedAndCommunityService from "../../services/feeds-community";
import { eventConstants } from "../../constants";

class Community extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            menu: false,
            dialog: false,
            communities: [],
            communityList: [],
            name: "",
            file: {},
            picture: '',
            tableColumns: [
                "User Name",
                "Reported By",
                "Reported On",
                "Report Type",
                "Post Title",
                
              ],
            PostReportList:[{name:"Alexa Appleseed",reportedBy:"Lara Jones",reportedOn:"11:25 AM, Today",reportType:"Comment",
            postTitle:"While your first "},{name:"Alexa Appleseed",reportedBy:"Lara Jones",reportedOn:"11:25 AM, Today",reportType:"Comment",
            postTitle:"While your first "}],
            tableColumns: [
                "User Name",
                "Reported By",
                "Reported On",
                "Report Type",
                "Post Title",
                
              ],
              suspendedUser:[{name:"Alexa Appleseed",reportedBy:"Lara Jones",reportedOn:"11:25 AM, Today",reportType:"Comment",postTitle:"While your first "},
              {name:"Alexa Appleseed",reportedBy:"Lara Jones",reportedOn:"11:25 AM, Today",reportType:"Comment",postTitle:"While your first "},
              {name:"Alexa Appleseed",reportedBy:"Lara Jones",reportedOn:"11:25 AM, Today",reportType:"Comment",postTitle:"While your first "}]

 };
    }

    componentDidMount() {
        this.getCommunitiesList()
    }

    getCommunitiesList = async () => {
        this.props.dispatchAction(eventConstants.SHOW_LOADER)
        let [error, communities] = await Utility.parseResponse(new FeedAndCommunityService().getCommunity())
        if (error) {
            this.props.dispatchAction(eventConstants.HIDE_LOADER)
            return
        }
        this.props.dispatchAction(eventConstants.HIDE_LOADER)
        this.setState({ communities })
    }


    addCommunity = async () => {
        if (!this.state.name || !this.state.file) {
            Utility.apiFailureToast("Please enter the requried field");
            return
        }
        this.props.dispatchAction(eventConstants.SHOW_LOADER)
        let image = await this.uploadFile()
        let [error, communities] = await Utility.parseResponse(new FeedAndCommunityService().addCommunity({
            name: this.state.name,
            image
        }))
        if (error) {
            this.props.dispatchAction(eventConstants.HIDE_LOADER)
            return
        }
        console.log(communities)
        this.setState({ dialog: false, name: '', file: {} })
        this.componentDidMount()
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


    onSearchChange = (value) => {
        value = String(value).toLowerCase()
        if (!value) {
            this.setState({ communities: this.state.communityList })
            return
        }
        let communities = this.state.communityList.filter(item => {
            return item.name.toLowerCase().includes(value)
        })
        this.setState({ communities })
    }

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    };

    onFileSelect = (files) => {
        if (files && files.length) {
            let fileReader = new FileReader()
            fileReader.readAsDataURL(files[0])
            fileReader.onload = (event) => {
                this.setState({ picture: event.target.result, file: files[0] })
            }
        }
    }



    render() {
        return (
            <Column>
                <Column>
                    {" "}
                    <Header handleChange={this.handleChange} />
                </Column>
                <Row>
                    <Column>
                        <Sidebar handleChange={this.handleChange}
                            open={this.state.menu}

                        />
                    </Column>

                    <Column className="w-100-per">

                        <ManageCommunity
                            state={this.state}
                            handleChange={this.handleChange}
                            onSearchChange={this.onSearchChange}
                            onFileSelect={this.onFileSelect}
                            addCommunity={this.addCommunity}
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

export default connect(mapStateToProps, { dispatchAction })(Community);