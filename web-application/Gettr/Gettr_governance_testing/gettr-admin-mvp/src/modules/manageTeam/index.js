import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DummyImage } from "../../common/components/components";
import { ProposalService } from "../../services";
import Utils from "../../utility";
import { Loader } from "../../common/components/components";

const Table = styled.table`
  border-spacing: 40px;
  border-collapse: collapse;
  margin-top: 13px;
  width: 100%;
  thead {
    tr {
      border-bottom: 1px solid #e7e7e7;
      th {
        padding: 15px;
        font: normal 700 14px/22px "Roboto";
        letter-spacing: -0.408px;
        color: #50555c;
        img {
          margin-left: 15px;
        }
      }
    }
  }
  tbody {
    tr {
      border-bottom: 1px solid #e7e7e7;
      cursor: pointer;

      td {
        padding: 15px;
        font: normal 400 14px/22px "Roboto";
        color: #000000;
        img {
          width: 41px;
          height: 41px;
          border-radius: 50%;
        }
        p {
          margin-bottom: 0px !important;
        }
        &:first-of-type {
          width: 120px;
          text-align: center;
        }
        section {
          margin-left: auto;
          margin-right: auto;
        }
      }
    }
  }
`;
const TD = styled.div`
  color: ${(props) => (props.color ? props.color : "#FC223B")};
`;
const LoaderDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 200px;
`;

const ManageTeam = ({ setDetailsModal, detailsAdmin, setActiveSuperAdminCount, searchValue }) => {
  const [adminList, setAdminList] = useState();

  const [loader, setLoader] = useState(true);

  async function adminListData() {
    let [error, response] = await Utils.parseResponse(
      ProposalService.getAdmins(searchValue)
    );
    if (error || !response) {
      return;
    }
    setLoader(false);
    setAdminList(response);
    const activeSuperAdmins = response.filter((admin) => {
      return admin.role === "SUPER_ADMIN" && admin.isApproved;
    });
    setActiveSuperAdminCount(activeSuperAdmins.length);
  }

  useEffect(() => {
    adminListData();
  }, [searchValue]);

  const typeColor = {
    true: "#03BD64",
    false: " #FC223B",
    INVITED: "#FFA629",
  };

  return (
    <>
      {loader && (
        <LoaderDiv>
          <Loader />
        </LoaderDiv>
      )}
      {adminList && (
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>Member Name</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          {adminList?.length > 0 &&
            adminList?.map((data, index) => {
              return (
                <tbody>
                  <tr
                    key={index}
                    onClick={() => {
                      setDetailsModal(true);

                      detailsAdmin(data);
                    }}
                  >
                    <td>
                      {data.picture ? (
                        <img
                          alt="avatar"
                          src={data?.picture}
                          onError={(e) => {
                            let users = [...adminList];
                            users[index].picture = "";
                          }}
                        />
                      ) : (
                        <DummyImage>{data.name.slice(0, 1)}</DummyImage>
                      )}
                    </td>
                    <td>
                      <p>{data.name}</p>
                    </td>
                    <td>{data.role}</td>
                    <td>
                      <TD color={typeColor[data.isApproved]}>
                        {data.isApproved ? "Active" : "Inactive"}
                      </TD>
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </Table>
      )}
    </>
  );
};

export default ManageTeam;
