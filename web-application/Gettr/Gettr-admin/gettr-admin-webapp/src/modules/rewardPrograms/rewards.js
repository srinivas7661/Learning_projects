import React, { useState } from "react";
import {
  Container,
  Heading,
  SearchAndFilter,
} from "../../common/components/components";
import SearchComponent from "../../common/searchComponent";
import FilterDropDown from "../../common/components/filterDropdown";
import { RewardHeader, TransactionEvents } from "../../constants";
import EntryRewardTable from "./entryTable";
import moment from "moment";
import { useEffect } from "react";
import { TransactionService } from "../../services";
import utility from "../../utility";

export default function Rewards() {
  const [rewardList, setRewardList] = useState([]);
  const limit = 10,
    skip = 0;
  useEffect(() => {
    (async () => {
      try {
        const [error, response] = await utility.parseResponse(
          TransactionService.getTransactions(limit, skip, {
            event: TransactionEvents.REWARD,
          })
        );
        if (error || !response || !response.data) {
          setRewardList([]);
          return;
        }
        const { data } = response;
        setRewardList(
          data.map((item) => ({
            txnHash: item.transactionId ? item.transactionId : "N/A",
            GTRId: item.receiver,
            entryId: item._id,
            date: moment(item.addedOn).format("L"),
            slot: item?.slot ?? "N/A",
            amount: item.amount + item.token,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return (
    <Container>
      <Heading>Rewards</Heading>
      <SearchAndFilter>
        <SearchComponent />
        <FilterDropDown />
      </SearchAndFilter>
      <EntryRewardTable header={RewardHeader} data={rewardList} />
    </Container>
  );
}
