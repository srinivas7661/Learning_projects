import React from "react";
import SubscriptionPlansComponent from "./component";
import BaseComponent from "../baseComponent";
import { Row, Column } from "simple-flexbox";
import Header from "../common/header";
import Sidebar from "../common/sidebar";
import Utility, { dispatchAction } from "../../utility";
import { connect } from 'react-redux';
import PlanAndSubscriptionService from "../../services/plansAndSubscriptions";
import { eventConstants } from "../../constants";
import { history } from "../../managers/history";

class SubscriptionPlans extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      plans: [],
      tableColumns: ["Plan Name", "Description", "Price", "Onboard Stage", ""],
      plansList: []
    };
  }

  componentDidMount() {
    this.getPlans()
  }

  getPlans = async () => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER, true)
    let [error, plans] = await Utility.parseResponse(new PlanAndSubscriptionService().getPlans())
    if (error) {
      this.props.dispatchAction(eventConstants.HIDE_LOADER, false)
      return
    }
    this.props.dispatchAction(eventConstants.HIDE_LOADER, false)
    this.setState({ plansList: plans })
    plans = plans.map((item, index) => {
      let plan = {}
      plan.planName = <span className="cursor-pointer" onClick={() => this.handlePlanClick(item.planId)}>{item.planName}</span>;
      plan.description = <span className="cursor-pointer" onClick={() => this.handlePlanClick(item.planId)}>{item.description}</span>;
      plan.price = <span className="cursor-pointer" onClick={() => this.handlePlanClick(item.planId)}>{item.price}</span>;
      plan.onBoardingStage = <span className="cursor-pointer" onClick={() => this.handlePlanClick(item.planId)}>{item.onBoardingStage}</span>;
      plan.edit =
        <Row className="justify-content-center">
          <img alt={index + "-edit"} className="cursor-pointer" src="/images/editIcon.svg" onClick={() => history.push(`/plans/edit?planId=${item.planId}`)} />
          <img alt={index + "-delete"} className="margin-left-20 cursor-pointer" onClick={() => this.deletePlan(item.planId)} src="/images/deleteIcon.svg" />
        </Row>
      // plan.handleClick = () => this.handlePlanClick(item.planId)
      return plan
    })
    this.setState({ plans })
  }

  handlePlanClick = (planId) => {
    let selectedPlan = this.state.plansList.find(item => item.planId === planId)
    this.setState({ selectedPlan })
    history.push(`/plans/plan-details?planId=${planId}`)
  }



  deletePlan = async (planId) => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER, true)
    let [error, plans] = await Utility.parseResponse(new PlanAndSubscriptionService().deletePlan(planId))
    if (error) {
      Utility.apiFailureToast(error && error.message ? error.message : error)
      this.props.dispatchAction(eventConstants.HIDE_LOADER, false)
      return
    }
    console.log(plans)
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    Utility.apiSuccessToast("Plan deleted successfully")
    history.push('/plans')
  }


  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };




  render() {
    return (
      <Column className="w-100-per">
        <Column>
          <Header handleChange={this.handleChange} />
        </Column>
        <Row className="w-100-per">
          <Column>
            <Sidebar handleChange={this.handleChange}
              open={this.state.menu}
            />
          </Column>
          <Column className="w-100-per">
            <SubscriptionPlansComponent
              state={this.state} />
          </Column>
        </Row>
      </Column>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps, { dispatchAction })(SubscriptionPlans);
