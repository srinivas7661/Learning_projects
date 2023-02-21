import { httpService } from "../utility/httpService";
import { httpConstants } from "../constants";

export default class PlanAndSubscriptionService {


    getHeaders() {
        return {
            'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON,
            'Access-Control-Allow-Origin': '*'
        }
    }

    async getPlans(requestData) {
        let url = process.env.REACT_APP_PLANS_AND_SUBSCRIPTION_SERVICE_URL + httpConstants.API_END_POINT.PLAN
        // let url = "http://localhost:3003" + httpConstants.API_END_POINT.PLAN
        return httpService(httpConstants.METHOD_TYPE.GET, this.getHeaders(), requestData, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                        return Promise.reject(response);
                    return Promise.resolve(response.responseData);
                }
            ).catch((err) => {
                return Promise.reject(err);
            });
    };


    async updatePlan(requestData) {
        let url = process.env.REACT_APP_PLANS_AND_SUBSCRIPTION_SERVICE_URL + httpConstants.API_END_POINT.PLAN
        // let url = "http://localhost:3003" + httpConstants.API_END_POINT.PLAN
        return httpService(httpConstants.METHOD_TYPE.PUT, this.getHeaders(), requestData, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData)
                        return Promise.reject(response);
                    return Promise.resolve(response.responseData);
                }
            ).catch((err) => {
                return Promise.reject(err);
            });
    };


    async addPlans(requestData) {
        let url = process.env.REACT_APP_PLANS_AND_SUBSCRIPTION_SERVICE_URL + httpConstants.API_END_POINT.PLAN
        // let url = "http://localhost:3003" + httpConstants.API_END_POINT.PLAN
        return httpService(httpConstants.METHOD_TYPE.POST, this.getHeaders(), requestData, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                        return Promise.reject(response);
                    return Promise.resolve(response.responseData);
                }
            ).catch((err) => {
                return Promise.reject(err);
            });
    };

    async deletePlan(planId) {
        let url = process.env.REACT_APP_PLANS_AND_SUBSCRIPTION_SERVICE_URL + `${httpConstants.API_END_POINT.PLAN}/${planId}`
        // let url = "http://localhost:3003" + `${httpConstants.API_END_POINT.PLAN}/${planId}`
        return httpService(httpConstants.METHOD_TYPE.DELETE, this.getHeaders(), {}, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                        return Promise.reject(response);
                    return Promise.resolve(response.responseData);
                }
            ).catch((err) => {
                return Promise.reject(err);
            });
    };

    async getPlanDetails(planId) {
        let url = process.env.REACT_APP_PLANS_AND_SUBSCRIPTION_SERVICE_URL + `${httpConstants.API_END_POINT.PLAN_DETAILS}/${planId}`
        // let url = "http://localhost:3003" + `${httpConstants.API_END_POINT.PLAN_DETAILS}/${planId}`
        return httpService(httpConstants.METHOD_TYPE.GET, this.getHeaders(), {}, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData)
                        return Promise.reject(response);
                    return Promise.resolve(response.responseData);
                }
            ).catch((err) => {
                return Promise.reject(err);
            });
    };


}
