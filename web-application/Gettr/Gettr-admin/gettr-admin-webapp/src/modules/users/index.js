import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container } from "../../common/components/components";
import SearchBar from "../../common/components/searchBar";
import FilterDropDown from "../../common/components/filterDropdown";
import FilterStatus from "../../common/components/filterStatus";
import { usersTableHeads } from "../../constants";
import { history } from "../../managers/history";
import { UserService } from "../../services";

const Tittle = styled.div`
  font: normal 700 20px/22px var(--root-font);
  letter-spacing: -0.408px;
  color: #1e1e1e;
`;
const UserTable = styled.table`
  border-spacing: 40px;
  width: 100%;
  border-collapse: collapse;
  margin-top: 13px;
  tbody {
    tr {
      border-bottom: 1px solid #e7e7e7;
      th {
        padding: 15px;
        font: normal 700 14px/22px var(--root-font);
        letter-spacing: -0.408px;
        color: #50555c;
        div {
          display: flex;
          flex-direction: row;
          gap: 10px;
        }
      }
      td {
        padding: 15px;
        font: normal 400 14px/22px var(--root-font);
        color: #000000;
      }
    }
  }
`;
const ImageContainer = styled.div`
  border-radius: 60%;
  height: 41px;
  width: 41px;
  overflow: hidden;
  margin-bottom: 4px;
`;
const SearchAndFilter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 11px;
`;
const FilterHead = styled.div`
  position: relative;
`;

export default function Users() {
  const [statusFilter, setStatusFilter] = useState("ACTIVE");
  const [dropDown, setDropDown] = useState(false);
  const [userList, setUserList] = useState([]);

  function Handle(head) {
    head === "Status" ? setDropDown((pre) => !pre) : setDropDown(false);
  }
  const getUserList = async () => {
    try {
      const response = await UserService.getUser();
      setUserList(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getUserList();
  }, []);

  function titleCase(str) {
    const splitStr = str?.toLowerCase?.().split?.(" ");
    for (let index = 0; index < splitStr.length; index++) {
      splitStr[index] =
        splitStr[index]?.charAt?.(0).toUpperCase?.() +
        splitStr[index]?.substring?.(1);
    }
    return splitStr?.join(" ");
  }

  return (
    <Container>
      <Tittle>Users</Tittle>
      <SearchAndFilter>
        <SearchBar />
        <FilterDropDown />
      </SearchAndFilter>
      <UserTable>
        <tbody>
          <tr>
            {usersTableHeads.map((head, key) => (
              <th key={key}>
                {head !== "" ? (
                  <FilterHead>
                    {head}{" "}
                    <img
                      key={head}
                      onClick={() => Handle(head)}
                      src="/images/filter.svg"
                      alt="/"
                    />
                    {dropDown ? (
                      <FilterStatus
                        head={head}
                        statusFilter={statusFilter}
                        setDropDown={setDropDown}
                        setStatusFilter={setStatusFilter}
                      />
                    ) : (
                      <></>
                    )}
                  </FilterHead>
                ) : (
                  <></>
                )}
              </th>
            ))}
          </tr>
          {userList.length > 0 &&
            userList.map((data, key) => (
              <tr
                key={key}
                onClick={() => history.push(`/user-details/${data.gettrId}`)}
              >
                <td>
                  {data.picture ? (
                    <ImageContainer>
                      <img
                        src={data.picture}
                        alt="avatar-from"
                        height={41}
                        width={41}
                      />
                    </ImageContainer>
                  ) : (
                    <ImageContainer></ImageContainer>
                  )}
                </td>
                <td>{data?.name && titleCase(data?.name)}</td>
                <td>{data?.gettrId}</td>
                <td>{data?.ADRBalance}</td>
                <td>{data?.gtrBalance}</td>
                <td>{data?.entries}</td>
                <td>{data?.rewards}</td>
                <td>{data?.status}</td>
                <td>{data?.kycStatus}</td>
              </tr>
            ))}
        </tbody>
      </UserTable>
    </Container>
  );
}
