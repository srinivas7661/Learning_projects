import React, { useEffect } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CollectionTable from "./component/topCollectionTable/index";
import TopNftTable from "./component/topNftTable/index";
import Graph from "./component/nftSoldGraph/index";
import Utils from "../../utility";
import { TotalSalesService } from "../../services/index";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Analytics() {
  const [sales, setSales] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    getSales();
    getUsers();
  }, []);
  const getSales = async () => {
    let [error, nftSales] = await Utils.parseResponse(
      TotalSalesService.getTotalSales()
    );
    if (error || !nftSales) return;
    setSales(nftSales);
  };
  const getUsers = async () => {
    let [error, nftUsers] = await Utils.parseResponse(
      TotalSalesService.getTotalUser()
    );
    if (error || !nftUsers) return;
    setUsers(nftUsers);
  };
  let saleCount = sales?.totalDataCount;
  let userCount = users?.totalDataCount;
  let sale24Count = sales?.last24HoursData;
  let user24Count = users?.last24HoursData;

  console.log(saleCount, "Sale count");
  console.log(userCount, "User count");

  const Dashboard = [
    {
      icon: "/images/User.svg",
      itemName: "New users",
      itemDate: "24hrs",
      itemCount: user24Count,
    },
    { icon: "/images/Tick.svg", itemName: "Total users", itemCount: userCount },
    {
      icon: "/images/priceTag.svg",
      itemName: "Total sales",
      itemCount: saleCount,
    },
    {
      icon: "/images/priceTagBlue.svg",
      itemName: "Total sales",
      itemDate: "24hrs",
      itemCount: sale24Count,
    },
  ];
  console.log(sales, "sales response");
  return (
    <div className="padding-79 tab-padding-23 mb-padding-16">
      <div className="container mx-width-1550 mt-55 p-l-0 p-r-0">
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            className="justify-content-between p-l-24 p-l-16 mb-pl-16"
          >
            {Dashboard.map((row) => (
              <Grid
                item
                xs={2}
                sm={4}
                md={4}
                className="w-100 mx-width-356 p-l-0 tab-Mxwidth-340 mb-mxWidth m-l-1per"
              >
                <Paper className="dashboard-paper">
                  <div className="display-flex w-356 tab-width-340 mb-width-auto">
                    <img src={row.icon} className="h-111 w-111 mb-h-76 mb-w-76" />
                    <div className="m-auto display-flex flex-column align-self-center mb-flex-row">
                      <span className="new-user-text">
                        {row.itemName}
                        <span className="m-l-4 fs-14">{row.itemDate}</span>
                      </span>
                      <span className="user-count fs-24-mb-barlow">{row.itemCount}</span>
                    </div>
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
      <div
        className="container overflow-nft h-776 mx-width-1550 mt-45 p-l-0 p-r-0"
        id="category_scroll"
      >
        <Grid item xs={12}>
          <div>
            <div className="collection-table">
              <Graph />
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="mt-45">
            <div className="m-t-25">
              <CollectionTable />
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="mt-45">
            <div className="m-t-25">
              <TopNftTable />
            </div>
          </div>
        </Grid>
      </div>
    </div>
  );
}
