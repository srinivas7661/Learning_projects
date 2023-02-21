import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        alignItems: "center"
    },
    wrapper: {
        margin: theme.spacing(1),
        position: "relative"
    },
    buttonProgress: {
        color: blue[500],
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12
    }
}));

export default function Loader() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CircularProgress size={24} className={classes.buttonProgress} />
        </div>
    );
}