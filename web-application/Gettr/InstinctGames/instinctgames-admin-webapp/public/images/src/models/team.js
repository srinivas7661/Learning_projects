import { roleConstants, statusConstants } from "../constants";

export default class Team {
    constructor(team) {
        this.role = roleConstants.ADMIN;
        this.status = "";
        this.permissions = [];
        this.fullName = "";
        this.email = "";

        if (team) return this.setData(team);

    }

    setData(team) {
        this.role = team.role ? team.role : roleConstants.ADMIN
        this.status = team.status ? team.status : statusConstants.INACTIVE
        this.permissions = team.permissions ? team.permissions : []
        this.fullName = team.fullName ? team.fullName : 0
        this.email = team.email ? team.email : ""
    }
}