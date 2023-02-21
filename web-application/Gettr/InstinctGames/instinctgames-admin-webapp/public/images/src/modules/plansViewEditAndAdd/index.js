import React from "react";
import AddAndEditSubscrpitionComponent from "./component";
import BaseComponent from "../baseComponent";
import { Row, Column } from "simple-flexbox";
import Header from "../common/header";
import Sidebar from "../common/sidebar";
import Utility, { dispatchAction } from "../../utility";
import { connect } from 'react-redux';
import PlanAndSubscriptionService from "../../services/plansAndSubscriptions";
import { eventConstants } from "../../constants";
import { history } from "../../managers/history"

class AddAndEditSubscrpition extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      menuType: 'icon',
      plan: {},
      title: "",
      existing: false,
      detail: false
    };
  }


  componentDidMount() {
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);

    this.getPlanDetails(searchParams.get('planId'))
    let title = window.location.pathname.split("/")[2]
    title = title.charAt(0).toUpperCase() + title.slice(1)
    if (title.includes("details")) {
      title = "Plan Details"
      this.setState({ detail: true })
    }
    this.setState({ title })
  }

  getPlanDetails = async (planId) => {
    if (!planId) {
      this.setState({
        existing: false,
        plan: {
          planName: "",
          description: "",
          price: null,
          testAllowed: null,
          perTestCost: null,
          onBoardingStage: "",
          benefits: ""
        }
      })
      return
    }
    this.props.dispatchAction(eventConstants.SHOW_LOADER, true)
    let [error, plan] = await Utility.parseResponse(new PlanAndSubscriptionService().getPlanDetails(planId))
    if (error) {
      Utility.apiFailureToast(error && error.message ? error.message : error)
      this.props.dispatchAction(eventConstants.HIDE_LOADER, false)
      return
    }
    this.props.dispatchAction(eventConstants.HIDE_LOADER, true)
    this.setState({ plan, existing: true })
  }

  addPlan = async () => {
    if (this.validatePlanDetails(this.state.plan)) {
      Utility.apiFailureToast("Please enter required fields")
      return
    }
    let request = { ...this.state.plan }
    this.props.dispatchAction(eventConstants.SHOW_LOADER, true)
    let [error, plans] = await Utility.parseResponse(new PlanAndSubscriptionService().addPlans(request))
    if (error) {
      Utility.apiFailureToast(error && error.message ? error.message : error)
      this.props.dispatchAction(eventConstants.HIDE_LOADER, false)
      return
    }
    this.props.dispatchAction(eventConstants.HIDE_LOADER, true)
    Utility.apiSuccessToast("Plan added successfully")
    history.push("/plans")
  }



  deletePlan = async (planId) => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER, true)
    let [error, plans] = await Utility.parseResponse(new PlanAndSubscriptionService().deletePlan(planId))
    if (error) {
      Utility.apiFailureToast(error && error.message ? error.message : error)
      this.props.dispatchAction(eventConstants.HIDE_LOADER, false)
      return
    }
    this.props.dispatchAction(eventConstants.HIDE_LOADER, false)
    Utility.apiSuccessToast("Plan deleted successfully")
    history.push("/plans")
  }

  saveChanges = () => {
    if (this.state.existing) {
      this.updatePlan()
      return
    }
    this.addPlan()
  }

  validatePlanDetails = ({ planName, description, price, testAllowed, perTestCost, onBoardingStage, benefits }) => {
    return !planName || !description || !price || !testAllowed || !perTestCost || !onBoardingStage || !benefits
  }

  updatePlan = async () => {
    if (this.validatePlanDetails(this.state.plan)) {
      Utility.apiFailureToast("Please enter required fields")
      return
    }
    let request = { ...this.state.plan }
    this.props.dispatchAction(eventConstants.SHOW_LOADER, true)
    let [error, plans] = await Utility.parseResponse(new PlanAndSubscriptionService().updatePlan(request))
    if (error) {
      Utility.apiFailureToast(error && error.message ? error.message : error)
      this.props.dispatchAction(eventConstants.HIDE_LOADER, false)
      return
    }
    this.props.dispatchAction(eventConstants.HIDE_LOADER, true)
    Utility.apiSuccessToast("Plan updated successfully")
  }


  handleChange = (name, value) => {
    this.state.plan[name] = value
    this.setState({
      plan: this.state.plan,
    });
  };

  render() {
    return (
      <Column className="w-100-per">
        <Column>
          <Header
            handleChange={this.handleChange}
          />
        </Column>
        <Row className="w-100-per">
          <Column>
            <Sidebar
              handleChange={this.handleChange}
              open={this.state.menu}
              menuType={this.state.menuType}
            />
          </Column>
          <Column className="w-100-per">
            <AddAndEditSubscrpitionComponent
              state={this.state}
              handleChange={this.handleChange}
              deletePlan={this.deletePlan}
              saveChanges={this.saveChanges}
            />
          </Column>
        </Row>
      </Column>
    );
  }
}

const mapStateToProps = (user) => {
  return { user: user.user }
}

export default connect(mapStateToProps, { dispatchAction })(AddAndEditSubscrpition);
