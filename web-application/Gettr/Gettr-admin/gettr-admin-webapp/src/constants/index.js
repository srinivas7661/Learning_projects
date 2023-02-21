import utility from "../utility";

export const TransactionList = [
  {
    id: "639981e81b7aa500342711eb",
    transactionHash: "0xb84915ve430be93fx4d8159",
    transactionType: "Transfer",
    status: "Failed",
    amount: "10ADR",
    from: "@reaking.stmd",
    to: "@reaking.stmd",
    timeStamp: "15 sec ago",
  },
  {
    id: "639981e81b7aa500342711eb",
    transactionHash: "0xsfsfo15ve430be93fx4d8159",
    transactionType: "Redeem",
    status: "Success",
    amount: "10ADR",
    from: "GETTR_REDM",
    to: "@reaking.stmd",
    timeStamp: "15 sec ago",
  },
  {
    id: 3,
    transactionHash: "0xb84915ve430be93fxgesgese",
    transactionType: "Reward",
    status: "Pending",
    amount: "10ADR",
    from: "GETTR_RWRD",
    to: "@reaking.stmd",
    timeStamp: "15 sec ago",
  },
  {
    id: 4,
    transactionHash: "0xb85sesge430be93fx4d8159",
    transactionType: "Swap",
    status: "Pending",
    amount: "10ADR",
    from: "GETTR_SWAP",
    to: "@reaking.stmd",
    timeStamp: "15 sec ago",
  },
  {
    id: 5,
    transactionHash: "0xb84915v8g9rs8gs4d8159",
    transactionType: "Swap",
    status: "Success",
    amount: "10ADR",
    from: "GETTR_SWAP",
    to: "@reaking.stmd",
    timeStamp: "15 sec ago",
  },
  {
    id: 6,
    transactionHash: "0xb84915ve430be93fx4d8159",
    transactionType: "Swap",
    status: "Success",
    amount: "10ADR",
    from: "GETTR_SWAP",
    to: "@reaking.stmd",
    timeStamp: "15 sec ago",
  },
  {
    id: 7,
    transactionHash: "0xb84915ve430be93fx4d8159",
    transactionType: "Transfer",
    status: "Pending",
    amount: "10ADR",
    from: "@reaking.stmd",
    to: "@reaking.stmd",
    timeStamp: "15 sec ago",
  },
  {
    id: 8,
    transactionHash: "0xb84915ve430be93fx4d8159",
    transactionType: "Transfer",
    status: "Success",
    amount: "10ADR",
    from: "@reaking.stmd",
    to: "@reaking.stmd",
    timeStamp: "15 sec ago",
  },
  {
    id: 9,
    transactionHash: "0xb84915ve430be93fx4d8159",
    transactionType: "Transfer",
    status: "Success",
    amount: "10ADR",
    from: "@reaking.stmd",
    to: "@reaking.stmd",
    timeStamp: "15 sec ago",
  },
  {
    id: 10,
    transactionHash: "0xb84915ve430be93fx4d8159",
    transactionType: "Transfer",
    status: "Pending",
    amount: "10ADR",
    from: "@reaking.stmd",
    to: "@reaking.stmd",
    timeStamp: "15 sec ago",
  },
  {
    id: 11,
    transactionHash: "0xb84915ve430be93fx4d8159",
    transactionType: "Transfer",
    status: "Pending",
    amount: "10ADR",
    from: "@reaking.stmd",
    to: "@reaking.stmd",
    timeStamp: "15 sec ago",
  },
  {
    id: 12,
    transactionHash: "0xb84915ve430be93fx4d8159",
    transactionType: "Redeem",
    status: "Pending",
    amount: "10ADR",
    from: "GETTR_REDM",
    to: "@reaking.stmd",
    timeStamp: "15 sec ago",
  },
];

export const httpConstants = {
  METHOD_TYPE: {
    POST: "POST",
    PATCH: "PATCH",
    PUT: "PUT",
    GET: "GET",
    DELETE: "DELETE",
  },
  CONTENT_TYPE: {
    APPLICATION_JSON: "application/json",
    MULTIPART_FORM_DATA: "multipart/form-data",
    APPLICATION_FORM_URLENCODED: "application/x-www-form-urlencoded",
    IMAGE_PNG: "image/png",
  },
  DEVICE_TYPE: {
    WEB: "web",
  },
  API_END_POINT: {
    GET_TRANSACTION_BY_ID: "/transactions",
    GET_TOTAL_ENTRIES: "/total-entries",
    TOTAL_ENTRIES_COUNT: "/total-entries-count",
    GET_TOTAL_PARTICIPANTS: "/total-participants",
    GET_POPULAR_ACTIVITIES: "/popular-activities",
    GET_ACTIVE_SLOT: "/active-slot",
    TRANSACTIONS: "/transactions",
    TOTAL_TRANSACTIONS: "/total-transactions",
    SCHEDULES: "/schedules",
    GET_ENTRIES: "/entries",
    GET_ACTIVITIES: "/activities",
    UPDATE_ADMIN: "/admins/",
    GET_REWARD_ANALYTICS: "/reward-analytics",
    ADD_ADMIN: "/admins",
    USER_LIST: "/list-users",
    USER_BY_ID: "/gettrpay-users",
    ADMINS: "/admins",
    REWARDS_GRAPH_DATA: "/rewards-graph-data",
    ENTRIES_GRAPH_DATA: "/entries-graph-data",
    CLEAR_INTERVAL: "/clear-interval",
    GET_TOTAL_REWARDS: "/total-rewards",
    SLOT_ANALYTICS: "/slot-analytics",
  },
};
export const gettrStatsRange = [
  { id: "D1", value: "1D" },

  { id: "D7", value: "7D" },

  { id: "M1", value: "1M" },

  { id: "M3", value: "3M" },

  { id: "Y1", value: "1Y" },

  { id: "YTD", value: "YTD" },

  { id: "All", value: "All" },
];
export const gettrPayStatsTables = [
  "Transactions",
  "Wallets Created",
  "GTR Balance",
  "Redemptions",
];
export const rewardStatsTableList = ["Rewards", "Entries", "Participants"];
export const stringConstants = {
  AMOUNT: "Amount",
  ADMIN_PASSWORD: "Admin password",
  REWARD_PROGRAM: "Reward Program",
  TRANSACTIONS: "Transactions",
};
export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: "/images/dashboard.svg",
    iconSelected: "/images/dashboard-selected.svg",
  },
  {
    title: "Transactions",
    path: "/transactions",
    icon: "/images/transaction.svg",
    iconSelected: "/images/transaction-selected.svg",
  },
  {
    title: "Pool",
    path: "/pool",
    icon: "/images/pool.svg",
    iconSelected: "/images/pool-selected.svg",
  },
  {
    title: "Users",
    path: "/users",
    icon: "/images/users.svg",
    iconSelected: "/images/users-selected.svg",
  },
  {
    title: "Reward Program",
    icon: "/images/reward-program.svg",
    iconSelected: "/images/reward-program-selected.svg",
    closed: "images/right-arrow.svg",
    path: "/reward-program/analytics",
    subNav: [
      {
        title: "Reward Analytics",
        path: "/reward-program/analytics",
      },
      {
        title: "Reward Activities",
        path: "/reward-program/activities",
      },
      {
        title: "Schedule",
        path: "/reward-program/schedule",
      },
      {
        title: "Entries",
        path: "/reward-program/entries",
      },
      {
        title: "Rewards",
        path: "/reward-program/rewards",
      },
    ],
  },
  {
    title: "Manage Team",
    path: "/manage-team",
    icon: "/images/manage-team.svg",
    iconSelected: "/images/manage-team-selected.svg", //Icon for not selected, not avaialable, will update once i get
  },
];

export const usersTableHeads = [
  "",
  "User Name",
  "GETTR ID",
  "ADR Balance",
  "GTR Balance",
  "Entries",
  "Reward (GTR)",
  "Status",
  "KYC Status",
];
export const usersTableData = [
  {
    picture:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    userName: "Alexa Jones",
    GETTRID: "alex4342",
    ADRBalance: "10 ADR",
    GTRBalance: "10 GTR",
    Entries: "233",
    Reward: "120",
    Status: "ACTIVE",
    KYCStatus: "YES",
  },
  {
    picture:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    userName: "Jamar Mcgee",
    GETTRID: "jamasr545",
    ADRBalance: "10 ADR",
    GTRBalance: "10 GTR",
    Entries: "233",
    Reward: "120",
    Status: "ACTIVE",
    KYCStatus: "YES",
  },
  {
    picture:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    userName: "Paul Santos",
    GETTRID: "Paul6554",
    ADRBalance: "10 ADR",
    GTRBalance: "10 GTR",
    Entries: "233",
    Reward: "120",
    Status: "ACTIVE",
    KYCStatus: "YES",
  },
  {
    picture:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    userName: "Lily Samuel",
    GETTRID: "Lily543",
    ADRBalance: "10 ADR",
    GTRBalance: "10 GTR",
    Entries: "233",
    Reward: "120",
    Status: "ACTIVE",
    KYCStatus: "YES",
  },
  {
    picture:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    userName: "Ric Sam",
    GETTRID: "Ricsam89",
    ADRBalance: "10 ADR",
    GTRBalance: "10 GTR",
    Entries: "233",
    Reward: "120",
    Status: "ACTIVE",
    KYCStatus: "YES",
  },
  {
    picture:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    userName: "Jesus Navas",
    GETTRID: "jesu987",
    ADRBalance: "10 ADR",
    GTRBalance: "10 GTR",
    Entries: "244",
    Reward: "85",
    Status: "ACTIVE",
    KYCStatus: "YES",
  },
  {
    picture:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    userName: "Marco Polo",
    GETTRID: "marco543",
    ADRBalance: "10 ADR",
    GTRBalance: "10 GTR",
    Entries: "180",
    Reward: "90",
    Status: "BLOCKED",
    KYCStatus: "YES",
  },
  {
    picture:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    userName: "B.B.Jackson",
    GETTRID: "BBJ6543",
    ADRBalance: "10 ADR",
    GTRBalance: "10 GTR",
    Entries: "240",
    Reward: "170",
    Status: "ACTIVE",
    KYCStatus: "NO",
  },
  {
    picture:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    userName: "Suom Li",
    GETTRID: "SUO89456",
    ADRBalance: "10 ADR",
    GTRBalance: "10 GTR",
    Entries: "233",
    Reward: "120",
    Status: "ACTIVE",
    KYCStatus: "YES",
  },
  {
    picture:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    userName: "Yams Vedan",
    GETTRID: "Yam65432",
    ADRBalance: "10 ADR",
    GTRBalance: "10 GTR",
    Entries: "310",
    Reward: "120",
    Status: "INACTIVE",
    KYCStatus: "FAILED",
  },
];
export const manageTeamData = [
  {
    picture:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    name: "Alexa Jones",
    role: "Admin",
    permissions: [],
    status: "Active",
  },
  {
    picture:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    name: "Jamar Mcgee",
    role: "Super Admin",
    permissions: [],
    status: "Active",
  },
  {
    picture:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    name: "Paul Santos",
    role: "Admin",
    permissions: [],
    status: "Active",
  },
  {
    picture:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    name: "Lily Samuel",
    role: "SuperAdmin",
    permissions: [],
    status: "Active",
  },
  {
    picture:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    name: "Ric Sam",
    role: "Admin",
    permissions: [],
    status: "Active",
  },
  {
    picture:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    name: "Jesus Navas",
    role: "Super Admin",
    permissions: [],
    status: "Active",
  },
  {
    picture:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    name: "Marco Polo",
    role: "Admin",
    permissions: [],
    status: "Active",
  },
  {
    picture:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    name: "B.B.Jackson",
    role: "Super Admin",
    permissions: [],
    status: "Active",
  },
  {
    picture:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    name: "Suom Li",
    role: "Super Admin",
    permissions: [],
    status: "Inactive",
  },
  {
    picture:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    name: "Yams Vedan",
    role: "Admin",
    permissions: [],
    status: "Active",
  },
];

export const TransactionStatsTitle = [
  "Transactions",
  "Txn Value",
  "Redemptions",
  "Pending Transactions",
  "Failed Transactions",
];

export const RewardAndEntriesCommonHeader = [
  {
    name: "GETTR ID",
    filterRequired: true,
  },
  {
    name: "EntryID",
    filterRequired: true,
  },
  {
    name: "Date",
    filterRequired: true,
  },
  {
    name: "Timeslot",
    filterRequired: true,
  },
];

const rewardFilter = {
  name: "Reward",
  filterRequired: true,
};

const amountFilter = {
  name: "Amount",
  filterRequired: true,
};

export const EntitiesHeader = [
  {
    name: "Activity Name",
    filterRequired: false,
  },
  ...RewardAndEntriesCommonHeader,
  rewardFilter,
];

export const RewardHeader = [
  {
    name: "Txn Hash",
    filterRequired: false,
  },
  ...RewardAndEntriesCommonHeader,
  amountFilter,
];

export const Slots = [
  {
    name: "12 AM - 2 AM",
    value: "12AM-2AM",
  },
  {
    name: "2 AM - 4 AM",
    value: "2AM-4AM",
  },
  {
    name: "4 AM - 6 AM",
    value: "4AM-6AM",
  },
  {
    name: "6 AM - 8 AM",
    value: "6AM-8AM",
  },
  {
    name: "8 AM - 10 AM",
    value: "8AM-10AM",
  },
  {
    name: "10 AM - 12 PM",
    value: "10AM-12PM",
  },
  {
    name: "12 PM - 2 PM",
    value: "12AM-2PM",
  },
  {
    name: "2 PM - 4 PM",
    value: "2PM-4PM",
  },
  {
    name: "4 PM - 6 PM",
    value: "4PM-6PM",
  },
  {
    name: "6 PM - 8 PM",
    value: "6PM-8PM",
  },
  {
    name: "8 PM - 10 PM",
    value: "8PM-10PM",
  },
  {
    name: "10 PM - 12 AM",
    value: "10PM-12AM",
  },
];
export const rewardsStatsData = [
  {
    title: "Entries",
    total: 25500,
    todayEntries: 440,
  },
  {
    title: "Rewards",
    value: "63,000 GTR",
    description: "12,221.00 USD",
  },
  {
    title: "Participants",
    participants: 3260,
    totalUser: 7723,
  },
  {
    title: "Active Slot",
    slot: `${utility.getCurrentSlot()}`,
    entries: 127,
  },
];

export const analyticsValues = [
  {
    tittle: "Reward Value",
    value: "2,560 GTR",
  },
  {
    tittle: "Entries",
    value: "10,340",
  },
  {
    tittle: "User Won",
    value: "1,566",
  },
  {
    tittle: "User Participated",
    value: "5,243",
  },
  {
    tittle: "Active Slot",
    value: `${utility.getCurrentSlot().slot}`,
  },
];
export const entriesLineGraphData = [
  {
    name: "3:00 AM",
    uv: 4000,
    pv: 200,
    amt: 400,
  },
  {
    name: "3:10 AM",
    uv: 2000,
    pv: 200,
    amt: 400,
  },
  {
    name: "3:20 AM",
    uv: 1900,
    pv: 200,
    amt: 400,
  },
  {
    name: "3:25 AM",
    uv: 1950,
    pv: 200,
    amt: 400,
  },
  {
    name: "4:30 AM",
    uv: 1000,
    pv: 3000,
    amt: 1400,
  },

  {
    name: "7:30 AM",
    uv: 6000,
    pv: 2400,
    amt: 100,
  },
  {
    name: "8:30 AM",
    uv: 100,
    pv: 2400,
    amt: 1400,
  },
  {
    name: "8:35 AM",
    uv: 100,
    pv: 2400,
    amt: 1400,
  },
  {
    name: "9:30 AM",
    uv: 1000,
    pv: 2400,
    amt: 1400,
  },
  {
    name: "10:30 AM",
    uv: 4000,
    pv: 2400,
    amt: 1400,
  },
  {
    name: "11:30 AM",
    uv: 2000,
    pv: 2400,
    amt: 1400,
  },
];
export const timeSlotGraphData = [
  {
    name: "10AM - 12AM",
    TotalRewards: 4000,
    pv: 2400,
    TotalEntries: 2400,
  },
  {
    name: "8AM - 10AM",
    TotalRewards: 3000,
    pv: 1398,
    TotalEntries: 2210,
  },
  {
    name: "6AM - 8AM",
    TotalRewards: 2000,
    pv: 9800,
    TotalEntries: 2290,
  },
  {
    name: "4AM - 6AM",
    TotalRewards: 2780,
    pv: 3908,
    TotalEntries: 2000,
  },
  {
    name: "2AM - 4AM",
    TotalRewards: 1890,
    pv: 4800,
    TotalEntries: 2181,
  },
  {
    name: "12AM-2AM",
    TotalRewards: 2390,
    pv: 3800,
    TotalEntries: 2500,
  },
  {
    name: "10PM - 12AM",
    TotalRewards: 3490,
    pv: 4300,
    TotalEntries: 2100,
  },
  {
    name: "8PM - 10PM",
    TotalRewards: 3490,
    pv: 4300,
    TotalEntries: 2100,
  },
  {
    name: "6PM - 8PM",
    TotalRewards: 3490,
    pv: 4300,
    TotalEntries: 2100,
  },
  {
    name: "4PM - 6PM",
    TotalRewards: 3490,
    pv: 4300,
    TotalEntries: 2100,
  },
  {
    name: "2PM - 4PM",
    TotalRewards: 3490,
    pv: 4300,
    TotalEntries: 2100,
  },
  {
    name: "12PM - 2PM",
    TotalRewards: 3490,
    pv: 4300,
    TotalEntries: 2100,
  },
];
export const activityList = [
  {
    activity: "Make a post on US Election",
    entries: 100,
    rewards: 1,
    costPerEntry: 1,
    popularSlot: "2PM-4PM",
  },
  {
    activity: "Make a post on World Cup",
    entries: 300,
    rewards: 5,
    costPerEntry: 5,
    popularSlot: "2PM-4PM",
  },
  {
    activity: "Create 2 Vision",
    entries: 100,
    rewards: 2,
    costPerEntry: 1,
    popularSlot: "2PM-4PM",
  },
  {
    activity: "Make a post on US Election",
    entries: 300,
    rewards: 100,
    costPerEntry: 1,
    popularSlot: "2PM-4PM",
  },
  {
    activity: "Get 1000 likes",
    entries: 200,
    rewards: 1000,
    costPerEntry: 10,
    popularSlot: "2PM-4PM",
  },
  {
    activity: "Do a LiveStream",
    entries: 400,
    rewards: 1,
    costPerEntry: 1,
    popularSlot: "2PM-4PM",
  },
  {
    activity: "Get 50 Unique Views",
    entries: 200,
    rewards: 50,
    costPerEntry: 1,
    popularSlot: "2PM-4PM",
  },
];

export const TransactionEvents = {
  SEND: "SEND",
  BUY: "BUY",
  RECEIVE: "RECEIVE",
  SWAP: "SWAP",
  STAKE: "STAKE",
  REWARD: "REWARD",
  REDEEM: "REDEEM",
  ADD_TO_POOL: "ADD_TO_POOL",
  WITHDRAW_FROM_POOL: "WITHDRAW_FROM_POOL",
};

export const AdminPermissions = [
  {
    name: "Manage User",
    value: "MANAGE_USER",
  },
  {
    name: "Manage Pool",
    value: "MANAGE_POOL",
  },
  {
    name: "Manage Rewards Activity",
    value: "MANAGE_REWARD_ACTIVITY",
  },
  {
    name: "Manage Team",
    value: "MANAGE_TEAM",
  },
];

export const AdminRoles = [
  {
    name: "Super Admin",
    value: "SUPER_ADMIN",
  },
  {
    name: "Admin",
    value: "ADMIN",
  },
];
