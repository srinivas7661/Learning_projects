import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: 9,
  height: 375,
  borderRadius: 13,
  backgroundColor: "#6a0dad",
}));


export default function CardComponent(props) {
    const {cardHeading,cardTitle,images,userDp} = props
  return (
        <Card className="card-container">
      <CardActionArea>
      <CardMedia
          component="img"
          image={userDp}
          alt="green iguana"
          className="user-img"
          align="left"
        />
        <CardMedia
          component="img"
          height="140"
            image={images}
          alt="green iguana"
          className="card-img"
        />
        <CardContent>
          <Typography className="card-title">
          {cardHeading}
          </Typography>
          <Typography className="card-lower-text">
          {cardTitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
