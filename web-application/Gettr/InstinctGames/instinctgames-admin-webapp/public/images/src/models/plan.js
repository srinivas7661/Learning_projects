export default class Plans {
    constructor(plan) {
        this.planName = "";
        this.description = "";
        this.price = 0;
        this.testAllowed = 0;
        this.perTestCost = 0;
        this.onBoardingStage = "";
        this.benefits = "";

        if (plan) return this.setData(plan);

    }

    setData(plan) {
        this.planName = plan.planName ? plan.planName : ""
        this.description = plan.description ? plan.description : ""
        this.price = plan.price ? plan.price : 0
        this.testAllowed = plan.testAllowed ? plan.testAllowed : 0
        this.perTestCost = plan.perTestCost ? plan.perTestCost : 0
        this.onBoardingStage = plan.onBoardingStage ? plan.onBoardingStage : ""
        this.benefits = plan.benefits ? plan.benefits : ""
    }
}