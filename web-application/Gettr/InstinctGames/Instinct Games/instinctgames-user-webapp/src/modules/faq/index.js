import React, { Component } from "react";
import FaqComponent from "./faqComponent";
import { faqData } from "../../constants/index";
import HeaderComponent from "../common/header";
import FooterComponent from "../common/footer";
import { v4 as uuid } from "uuid";

class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faqList: [
        {
          id: uuid(),
          view: false,
          question: "What is floor price?",
          answer:
            "The floor price is the lowest price for NFT’s in a specific collection and is adjusted in real-time.",
        },
        {
          id: uuid(),
          view: false,
          question: "What network is Hoardable on?",
          answer:
            "Hoardable has initially launched on Binance Smart Chain (BSC).",
        },
        {
          id: uuid(),
          view: false,
          question: "Will Hoardable have cross-chain compatibility?",
          answer: "Yes, Hoardable will support Ethereum and Solana soon.",
        },
        {
          id: uuid(),
          view: false,
          question:
            "What makes Hoardable different to the other marketplaces currently available?",
          answer:
            "At Hoardable we strive to create an environment where projects can be created, grow, and thrive. Giving developers the tools, they need to accept their token directly for NFT offerings.",
        },
        {
          id: uuid(),
          view: false,
          question: "What can we expect from Hoardable in the coming months?",
          answer:
            "We are always busy working on the next way to innovate and grow our platform. We intend to have a fully functioning launch pad for new vetted gaming project incubation. A fully functional DEX to allow for fast swaps between any of the supported tokens on Hoardable. Live trade windows. Tired of having to liquidate assets for cheap? Miss the Haggle? Not for much longer, we are working to enable an interface where you can offer not just currency for NFT’s but also other NFT’s from your own collection as part of a deal. All this and much more to come.",
        },
        {
          id: uuid(),
          view: false,
          question: "What is the “Hidden Section” on my profile?",
          answer:
            "Due to the nature of transactions on the blockchain, anyone can send and receive tokens to wallet addresses. This is a normal process for some projects who may airdrop their current holders with further tokens however it is not always used in this way and can lead to unwanted NFTs on a user’s profile. Therefore, we have implemented a filter system to profiles to allow users to hide unwanted NFT’s in the “Hidden” tab.",
        },
        {
          id: uuid(),
          view: false,
          question: "Will you be upgrading features?",
          answer:
            "Yes, we expect to roll out updates on a regular update. Please bear in mind that Hoardable is currently in Beta and a plethora of upgrades are scheduled.",
        },
        {
          id: uuid(),
          view: false,
          question: "What wallets are compatible?",
          answer:
            "At this current time, we support Wallet Connect and Metamask connectivity.",
        },
        {
          id: uuid(),
          view: false,
          question: "What does Custom token support mean?",
          answer:
            "Project owners can request to list their token as an accepted payment method on Hoardable. ",
        },
        {
          id: uuid(),
          view: false,
          question:
            "Does this mean that I might receive a different currency for my NFT I have listed?",
          answer:
            "No, the custom token must be chosen as the method of payment when listing the NFT for sale. Whatever currency the seller chooses when listing the NFT is the currency they will receive.",
        },
        {
          id: uuid(),
          view: false,
          question: "What are the benefits in Custom Token support?",
          answer:
            "First and foremost is to provide an immediate use case to projects. This grant projects the ability to list their NFT’s directly for the project’s currency giving investors the ability to use their tokens for purchases.",
        },
        {
          id: uuid(),
          view: false,
          question:
            "I am a project owner, how can I list my token on Hoardable?",
          answer: (
            <span>
              Simply fill in the form{" "}
              <a id="unique-answer" href="/token-request">
                here{" "}
              </a>
              and we will get back to you.
            </span>
          ),
        },
        {
          id: uuid(),
          view: false,
          question:
            "How do I find the contract address and token ID of my NFT?",
          answer:
            "You can find the Contract Address and TokenID of the NFT by simply going to its block explorer page (Etherscan, Bscscan, etc.)",
        },
        {
          id: uuid(),
          view: false,
          question:
            "Where are my NFT’s kept? Are they limited to just Hoardable platform?",
          answer:
            "Hoardable is non-custodial, meaning we have no ownership over your NFT’s. Your NFT’s are stored in your own personal wallet. The only person with access to your NFT’s purchased via Hoardable is you. All NFT’s are available to be viewed and traded on other marketplaces.",
        },
        {
          id: uuid(),
          view: false,
          question: "Who pays the gas fee?",
          answer:
            "Gas fees are like transaction fees on the blockchain. When you make transactions, such as making transfers to another wallet or purchasing a digital collectible on Hoardable, you'll need enough BNB in your wallet for the initial transaction and the associated gas fees.",
        },
        {
          id: uuid(),
          view: false,
          question:
            "Why choose to launch first on Binance rather than Ethereum?",
          answer:
            "Our studio is developing 2 blockchain integrated games based on Binance so it was important for us to launch on Binance smart chain first.",
        },
        {
          id: uuid(),
          view: false,
          question: "What fees can I expect to pay to mint an NFT?",
          answer:
            "The only fee you pay is the gas fee for the transaction. This can vary depending on the time and day and we have no control over said fees.",
        },
      ],
    };
  }

  displayReply = (index) => {
    this.setState((prevState) => ({
      faqList: prevState.faqList.map((item) => {
        if (item.id === index) {
          item.view = !item.view;
          return item;
        } else {
          return item;
        }
      }),
    }));
  };

  componentDidMount() {}

  render() {
    const { faqList } = this.state;
    return (
      <>
        <HeaderComponent />
        <FaqComponent faqList={faqList} displayReply={this.displayReply} />
        <FooterComponent />
      </>
    );
  }
}

export default Faq;
