import React, { useEffect } from "react";
import {
  Container,
  Heading,
  SearchAndFilter,
} from "../../common/components/components";
import SearchComponent from "../../common/searchComponent";
import FilterDropDown from "../../common/components/filterDropdown";
import { EntitiesHeader } from "../../constants";
import EntryRewardTable from "./entryTable";
import { useState } from "react";
import { RewardsService } from "../../services";
import moment from "moment";
import utility from "../../utility";

export default function Entries() {
  const [entryList, setEntryList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const [error, response] = await utility.parseResponse(
          RewardsService.getEntries()
        );
        if (error || !response || !response.data) {
          setEntryList([]);
          return;
        }
        const { data } = response;
        setEntryList(
          data.map((item) => ({
            activityName: item?.activity ?? "N/A",
            gettrId: item.gettrId,
            entryId: item._id,
            date: moment(item.date).format("L"),
            timeSlot: item.slot.toUpperCase(),
            reward: item.reward ? "Yes" : "No",
          }))
        );
      } catch (error) {
        setEntryList([]);
        console.log(error);
      }
    })();
  }, []);

  return (
    <Container>
      <Heading>Entries</Heading>
      <SearchAndFilter>
        <SearchComponent />
        <FilterDropDown />
      </SearchAndFilter>

      <EntryRewardTable header={EntitiesHeader} data={entryList} />
    </Container>
  );
}
