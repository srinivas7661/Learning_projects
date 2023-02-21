import React from 'react';
import { Paper, Table, TableCell, TableRow, Drawer } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import styled from "styled-components";
import { useDispatch } from "react-redux"
import FeedAndCommunityService from '../../services/feeds-community';
import CustomTable from '../../common/components/customTable';
import { eventConstants, statusConstants } from '../../constants';
import Utility from '../../utility';
import moment from 'moment';
import { Row, Column } from 'simple-flexbox';


const Heading = styled.div`
text-align: left;
font: normal normal bold 16px/22px Nunito;
letter-spacing: 0px;
color: #7D84C0;
opacity: 1;
`;
const Text = styled.div`
text-align: left;
font: normal normal normal 16px/22px Nunito;
letter-spacing: 0px;
color: #7D84C0;
opacity: 1;
`;

const PublishButton = styled.button`
width: 300px;
height: 45px;
background: #F6CB83;
border-radius: 7px;
border: none;
text-align: center;
font: normal normal bold 16px/22px Nunito;
letter-spacing: 0px;
color: #5C4B75;
`;
const RejectButton = styled.button`
width: 300px;
height: 45px;
background: #5C4B75;
border-radius: 7px;
border: none;
text-align: center;
font: normal normal bold 16px/22px Nunito;
letter-spacing: 0px;
color: #FFF4F3;
`;


const PostImage = styled.img`
width: 100%;
`;

const useStyles = makeStyles({
    drawer: {
        width: "40%",
        display: "flex",
        flexFlow: "column",
        justifyContent: "space-between"
    },
    paper: {
        width: "100%",
        boxShadow: " 0 3px 6px rgba(0,0,0,0.10)",
        marginTop: "20px",
    },
    paperPendding: {
        width: "100%",
        boxShadow: " 0 3px 6px rgba(0,0,0,0.10),0 3px 6px rgba(0,0,0,0.10),0 3px 6px rgba(0,0,0,0.10)",
        marginTop: "20px",
    },
    paperPost: {
        width: "100%",
        height: "400px",
        marginTop: "10px"
    }
});


function Posts(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [posts, setPosts] = React.useState([])
    const [selectedPost, setSelectedPost] = React.useState({})
    const [drawer, setDrawer] = React.useState(false)

    const toggleDrawer = (post) => {
        if (post !== undefined) {
            setSelectedPost(post)
        }
        setDrawer(!drawer)
    }

    React.useEffect(() => {
        getUsersPost(props.userId)
    }, [])

    const getUsersPost = async (userId) => {
        dispatch({ type: eventConstants.SHOW_LOADER, data: true })
        let [error, usersPosts] = await Utility.parseResponse(new FeedAndCommunityService().getUsersPost(
            userId
        ))
        if (error) {
            dispatch({ type: eventConstants.HIDE_LOADER, data: false })
            console.log(error)
            return
        }
        dispatch({ type: eventConstants.HIDE_LOADER, data: false })
        // setPostList(usersPosts)
        usersPosts = usersPosts.map((item, index) => {
            let post = {}

            post['title'] = item.title
            post['category'] = `${item.publishedBy?.name}`
            post['addedOn'] = moment(item.addedOn).format("HH:mm A, D MMM YYYY")
            post['likes'] = item.likes?.length
            post['comments'] = item.comments?.length
            post['status'] = item.status === statusConstants.PENDING || item.status === statusConstants.REJECTED ? <span className="fc-Ruddy-Pink">{item.status}</span> : <span className="fc-90CFB3">{item.status}</span>
            post['handleClick'] = item.status === statusConstants.PENDING ? () => toggleDrawer(item) : ""
            return { ...post }
        })
        setPosts(usersPosts)

    }

    const acceptPost = async (id) => {
        dispatch({ type: eventConstants.SHOW_LOADER, data: true })
        let [error, posts] = await Utility.parseResponse(new FeedAndCommunityService().acceptPost({
            id
        }))
        if (error) {
            dispatch({ type: eventConstants.HIDE_LOADER, data: false })
            console.log(error)
            return
        }
        console.log(posts)
        setDrawer(!drawer)
        dispatch({ type: eventConstants.HIDE_LOADER, data: false })
        Utility.apiSuccessToast('Post published successfully')
        getUsersPost(props.userId)

    }


    const rejectPost = async (id) => {
        dispatch({ type: eventConstants.SHOW_LOADER, data: true })
        let [error, posts] = await Utility.parseResponse(new FeedAndCommunityService().rejectPost({
            id
        }))
        if (error) {
            dispatch({ type: eventConstants.HIDE_LOADER, data: false })
            console.log(error)
            return
        }
        console.log(posts)
        setDrawer(!drawer)
        dispatch({ type: eventConstants.HIDE_LOADER, data: false })
        Utility.apiSuccessToast('Post rejected successfully')
        getUsersPost(props.userId)

    }



    return (
        <>
            <div className="display-block display-none-web">
                <CustomTable
                    tableHeading={""}
                    columns={["Post Title", "Category", "Date & Time", "Likes", "Comments", "Status", ""]}
                    rows={posts}
                    isCheckBoxVisible={false}
                />
            </div>
            <div className="display-none display-block-tab">
                <Paper className={classes.paperPendding}>
                    <Table>
                        {posts.map((row, index) => (
                            <TableRow onClick={() => row.handleClick ? row.handleClick() : ""}>
                                <TableCell>
                                    <Table>
                                        <TableRow>
                                            <TableCell className="fc-7D84C0 border-bottom-none" >Post Title</TableCell>
                                            <TableCell className="border-bottom-none">{row.title}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="fc-7D84C0 border-bottom-none" style={{ borderBottom: "none" }}>Category</TableCell>
                                            <TableCell className="border-bottom-none">{row.category}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="fc-7D84C0 border-bottom-none">Date&Time</TableCell>
                                            <TableCell className="border-bottom-none">{row.addedOn}</TableCell>
                                        </TableRow>
                                    </Table>
                                </TableCell>
                                <TableCell>
                                    <Table>
                                        <TableRow>
                                            <TableCell className="fc-7D84C0 border-bottom-none">Like</TableCell>
                                            <TableCell className="border-bottom-none">{row.likes}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="fc-7D84C0 border-bottom-none">Comments</TableCell>
                                            <TableCell className="border-bottom-none">{row.comments}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="fc-7D84C0 border-bottom-none">Status</TableCell>
                                            <TableCell className="border-bottom-none">{row.status}</TableCell>
                                        </TableRow>
                                    </Table>
                                </TableCell>
                            </TableRow>
                        ))}
                    </Table>
                </Paper>
            </div>


            <Drawer
                anchor={"right"}
                open={drawer}
                onClose={() => toggleDrawer(undefined)}
                variant={"persistent"}
                className="drawer-width-tab"
            >
                <Column className="justify-content-between h-100-per">
                    <div className="padding-20-px">
                        <Row className="justify-content-between align-items-center">
                            <Heading>Publish Post</Heading>
                            <img height="20px" onClick={() => toggleDrawer(undefined)} src="images/cross.svg" />
                        </Row>
                        <Row className="fw-bold margin-top-25 justify-content-center">{selectedPost?.title}</Row>

                        <Column className={"card w-100-per"}>
                            <PostImage className="h-60-pr" src={selectedPost?.picture} />
                            <div className="padding-10-px">
                                <span>{selectedPost?.content}</span>
                            </div>
                        </Column>
                        <Row className="align-items-center justify-content-between margin-top-25">
                            <Text>Category</Text>
                            <span className="fw-bold">{selectedPost?.category}</span>
                        </Row>
                    </div>
                    <Column className="align-items-center justify-content-center margin-bottom-20-px">
                        <PublishButton onClick={() => acceptPost(selectedPost?._id)}>Publish</PublishButton>
                        <RejectButton onClick={() => rejectPost(selectedPost?._id)} className="margin-top-20-px">Reject</RejectButton>
                    </Column>
                </Column>
            </Drawer>

        </>
    )
}

export default Posts;