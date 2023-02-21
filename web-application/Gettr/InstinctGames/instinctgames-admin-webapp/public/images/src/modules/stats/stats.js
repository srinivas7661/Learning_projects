import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Card from '../imageCard/card'


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: 9,
  height: 375,
  borderRadius: 13,
  backgroundColor: "#221142",
}));


const gameCard = [
    {
      cardHeading:"The Warrior Prince",
      cardTitle:"Sold to Lofi for 0.25 BNB",
      images:"",
      userDp:"defaultprofile.png" 
    },
    
]


export default function NestedGrid(props) {
    console.log("props of card",props)
  return (
    // <Box  className="stats-root">
      <Grid container spacing={2} column={16} className="grid-container">
      <Grid item xs={12} md={4} sm={4}>
        <Item>
          <div className="top-buyer">
            <span className="data-text">Top Buyers</span>
            <div>
              <select className="select-option">
                <option>Weekly</option>
              </select>
            </div>
          </div>
          <div className="top-data">
            <Avatar style={{ height: "42px", width: "42px" }}>W</Avatar>
            <div className="top-text">
              <span className="data-heading">@LazyArtist</span>
              <span className="top-hash">34 BNB($2000)</span>
            </div>
          </div>
          <hr className="hr-line"/>
          <div className="top-data">
            <Avatar style={{ height: "42px", width: "42px" }}>W</Avatar>
            <div className="top-text">
              <span className="data-heading">@LazyArtist</span>
              <span className="top-hash">34 BNB($2000)</span>
            </div>
          </div>
          <hr className="hr-line"/>
          <div className="top-data">
            <Avatar style={{ height: "42px", width: "42px" }}>W</Avatar>
            <div className="top-text">
              <span className="data-text">@LazyArtist</span>
              <span className="top-hash">34 BNB($2000)</span>
            </div>
          </div>
          <hr className="hr-line"/>
          <div className="top-data">
            <Avatar style={{ height: "42px", width: "42px" }}>W</Avatar>
            <div className="top-text">
              <span className="data-text">@LazyArtist</span>
              <span className="top-hash">34 BNB($2000)</span>
            </div>
          </div>
        </Item>
      </Grid>
      <Grid item xs={12} md={4} sm={4}>
        <Item>
          <div className="top-buyer">
            <span className="data-text">Top Sellers</span>
            <div>
              <select className="select-option">
                <option>Weekly</option>
              </select>
            </div>
          </div>
          <div className="top-data">
            <Avatar style={{ height: "42px", width: "42px" }}>W</Avatar>
            <div className="top-text">
              <span className="data-heading">@LazyArtist</span>
              <span className="top-hash">34 BNB($2000)</span>
            </div>
          </div>
          <hr className="hr-line"/>
          <div className="top-data">
            <Avatar style={{ height: "42px", width: "42px" }}>W</Avatar>
            <div className="top-text">
              <span className="data-heading">@LazyArtist</span>
              <span className="top-hash">34 BNB($2000)</span>
            </div>
          </div>
          <hr className="hr-line"/>
          <div className="top-data">
            <Avatar style={{ height: "42px", width: "42px" }}>W</Avatar>
            <div className="top-text">
              <span className="data-text">@LazyArtist</span>
              <span className="top-hash">34 BNB($2000)</span>
            </div>
          </div>
          <hr className="hr-line"/>
          <div className="top-data">
            <Avatar style={{ height: "42px", width: "42px" }}>W</Avatar>
            <div className="top-text">
              <span className="data-text">@LazyArtist</span>
              <span className="top-hash">34 BNB($2000)</span>
            </div>
          </div>
        </Item>
      </Grid>
      <Grid item xs={12}  md={4} sm={4}>
        <Item>
          <div className="top-buyer">
            <span className="data-text">Top Collection</span>
            <div>
              <select className="select-option">
                <option>Weekly</option>
              </select>
            </div>
          </div>
          <div className="top-data">
            <Avatar style={{ height: "42px", width: "42px" }}>W</Avatar>
            <div className="top-text">
              <span className="data-heading">@LazyArtist</span>
              <span className="top-hash">34 BNB($2000)</span>
            </div>
          </div>
          <hr className="hr-line"/>
          <div className="top-data">
            <Avatar style={{ height: "42px", width: "42px" }}>W</Avatar>
            <div className="top-text">
              <span className="data-heading">@LazyArtist</span>
              <span className="top-hash">34 BNB($2000)</span>
            </div>
          </div>
          <hr className="hr-line"/>
          <div className="top-data">
            <Avatar style={{ height: "42px", width: "42px" }}>W</Avatar>
            <div className="top-text">
              <span className="data-text">@LazyArtist</span>
              <span className="top-hash">34 BNB($2000)</span>
            </div>
          </div>
          <hr className="hr-line"/>
          <div className="top-data">
            <Avatar style={{ height: "42px", width: "42px" }}>W</Avatar>
            <div className="top-text">
              <span className="data-text">@LazyArtist</span>
              <span className="top-hash">34 BNB($2000)</span>
            </div>
          </div>
        </Item>
      </Grid>
          <Grid className="top-buyers">
        <div className="stats-root">
          <p className="top-nft">Top NFTs sale</p>
          <div className="select-div">
            <div>
              <select className="select-type-all">
                <option>Type All</option>
              </select>
              <select className="select-categories-all">
                <option>Categories All</option>
              </select>
            </div>
            <select className="select-last-days">
              <option>Last 7 Days</option>
            </select>
          </div>
        </div>
      </Grid>
      {gameCard.map((row) => (
          
          <Grid item xs={6} sm={4} md={4} lg={3} className="card-padding">
              
        <Card 
        cardHeading={row.cardHeading}
        cardTitle={row.cardTitle}
        images={row.images}
        userDp={row.userDp}
        />
       </Grid>
      
      ))}
      </Grid>
      
    // </Box>
  );
}
