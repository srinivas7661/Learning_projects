import React, { useState } from "react";
import styled from "styled-components";
import SearchComponent from "../../common/searchComponent";
import FilterDropDown from "../../common/filterDropDown";
import {
  Heading,
  SearchAndFilter,
  Container,
  DummyImage,
} from "../../common/components/components";
import AddAdmin from "../../common/popups/addAdmin";
import AdminDetails from "./adminDetails";
import adminMicroservice from "../../services/admin";
import utility from "../../utility";

const Table = styled.table`
  border-spacing: 40px;
  border-collapse: collapse;
  margin-top: 13px;
  max-width: 863px;

  tbody {
    tr {
      border-bottom: 1px solid #e7e7e7;
      th {
        padding: 15px;
        font: normal 700 14px/22px var(--root-font);
        letter-spacing: -0.408px;
        color: #50555c;
        img {
          margin-left: 15px;
        }
      }

      td {
        padding: 15px;
        font: normal 400 14px/22px var(--root-font);
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
          width: 60px;
        }
      }
    }
  }
`;

const ButtonContainer = styled.button`
  max-width: 211px;
  width: 100%;
  height: 48px;
  background: #fc223b;
  border-radius: 50px;
  font: normal 600 15px/22px var(--root-font);
  border: none;
  color: #ffffff;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const adminPhoto = "https://i.pravatar.cc/300";
const adminModel = {
  id: "",
  name: "",
  email: "",
  role: "",
  permissions: [],
  picture: adminPhoto,
};
const ManageTeam = () => {
  const [admins, setAdmins] = useState([]);
  const [open, setModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [admin, setAdmin] = useState(adminModel);

  const addAdmin = async (e) => {
    let [error, response] = await utility.parseResponse(
      adminMicroservice.addAdminUser(admin)
    );
    if (error || !response || !response.data) {
      return;
    }
    setModal(false);
  };

  const getAdmins = async (searchQuery) => {
    let [error, response] = await utility.parseResponse(
      adminMicroservice.getAdminUser(searchQuery)
    );
    if (error || !response) {
      return;
    }
    setAdmins(
      response.map((item) => {
        return {
          id: item._id,
          picture: item.picture,
          name: item.name,
          role: item.role,
          status: item.isActive ? "Active" : "InActive",
          permissions: item.permissions,
          isActive: item.isActive,
        };
      })
    );
  };

  useState(() => {
    getAdmins(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Container>
      <HeaderContainer>
        <Heading>Manage Team</Heading>
        <ButtonContainer
          onClick={() => {
            setModal(true);
            setAdmin(adminModel);
          }}
        >
          Add Admin
        </ButtonContainer>
      </HeaderContainer>
      <SearchAndFilter>
        <SearchComponent
          value={searchQuery}
          handleChange={handleSearchChange}
        />
        <FilterDropDown />
      </SearchAndFilter>
      <Table>
        <tbody>
          <tr>
            <th></th>
            <th>Member Name</th>
            <th>
              Role <img src="/images/filter-icon.svg" alt="filter-icon" />
            </th>
            <th>
              Status <img src="/images/filter-icon.svg" alt="filter-icon" />
            </th>
          </tr>
          {admins.length > 0 &&
            admins.map((data, index) => {
              return (
                <tr
                  key={index}
                  onClick={() => {
                    setDetailsModal(true);
                    setAdmin(data);
                  }}
                >
                  <td>
                    {data.picture ? (
                      <img
                        src={data?.picture}
                        alt="user_avatar"
                        onError={(e) => {
                          let users = [...admins];
                          users[index].picture = "";
                          setAdmins(users);
                        }}
                      />
                    ) : (
                      <DummyImage>{data.name.slice(0, 1)}</DummyImage>
                    )}
                  </td>
                  <td>
                    <p>{data.name}</p>
                  </td>
                  <td>{data?.role}</td>
                  <td>{data?.status}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <AddAdmin
        open={open}
        admin={admin}
        setModal={setModal}
        addAdmin={addAdmin}
        setAdmin={setAdmin}
      />
      {detailsModal ? (
        <AdminDetails
          open={detailsModal}
          setModal={setDetailsModal}
          admin={admin}
        />
      ) : null}
      ;
    </Container>
  );
};

export default ManageTeam;
