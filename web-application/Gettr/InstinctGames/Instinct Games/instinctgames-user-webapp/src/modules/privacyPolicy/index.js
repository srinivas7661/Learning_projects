import React, { Component } from "react";
import FooterComponent from "../common/footer/footer";
import Header from "../common/header";
import PrivacyPolicyComp from "./privacyPolicy";

class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          heading: "Overview",
          content: "Fusce cursus eros in risus malesuada, vel pharetra felis placerat.Suspendisse ac leo sit amet felis porta porttitor. Etiam sapien magna, tristique nec quam id, efficitur ultricies ex. Maecenas venenatis, lorem ut imperdiet consequat, lacus lacus cursus magna,ac varius nisi ex non nulla. Nam interdum ultricies ex ac pulvinar."
        },
        {
          heading: "Your Consent",
          content: "Fusce cursus eros in risus malesuada, vel pharetra felis placerat.Suspendisse ac leo sit amet felis porta porttitor. Etiam sapien magna, tristique nec quam id, efficitur ultricies ex. Maecenas venenatis, lorem ut imperdiet consequat, lacus lacus cursus magna,ac varius nisi ex non nulla. Nam interdum ultricies ex ac pulvinar."
        },
        {
          heading: "Information We Collect",
          content: "Fusce cursus eros in risus malesuada, vel pharetra felis placerat.Suspendisse ac leo sit amet felis porta porttitor. Etiam sapien magna, tristique nec quam id, efficitur ultricies ex. Maecenas venenatis, lorem ut imperdiet consequat, lacus lacus cursus magna,ac varius nisi ex non nulla. Nam interdum ultricies ex ac pulvinar."
        },
        {
          heading: "Use of Personal Information",
          content: "Fusce cursus eros in risus malesuada, vel pharetra felis placerat.Suspendisse ac leo sit amet felis porta porttitor. Etiam sapien magna, tristique nec quam id, efficitur ultricies ex. Maecenas venenatis, lorem ut imperdiet consequat, lacus lacus cursus magna,ac varius nisi ex non nulla. Nam interdum ultricies ex ac pulvinar."
        }
      ]
    };
  }

  render() {
    return (
      <>
      <Header/>
    <PrivacyPolicyComp
      state={this.state}
    />
      <FooterComponent/>
      </>
    );
  }
}

export default PrivacyPolicy;
