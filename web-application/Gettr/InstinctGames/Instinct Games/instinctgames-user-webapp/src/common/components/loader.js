import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoaderComponent = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: "50vh",
        zIndex: 100000,
      }}
    >
      <CircularProgress
        size={40}
        // left={-20}
        top={10}
        status="loading"
        style={{
          marginLeft: "50%",
        }}
      />
    </div>
  );
};
export default LoaderComponent;
