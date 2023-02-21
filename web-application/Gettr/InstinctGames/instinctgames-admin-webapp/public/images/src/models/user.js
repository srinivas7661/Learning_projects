export default class User {
    constructor(user) {

        this.userId = "";
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.mobileNumber = "";
        this.profilePic = "";
        this.role = "";

        this.personalInfo = {};


        this.status = "";
        this.isDeleted = "";
        this.modifiedOn = "";
        this.addedOn = "";
        this.isActive = "";
        this.address = {}

        if (user) return this.setData(user);

    }

    setData(user) {
        this.userId = user.userId ? user.userId : "-"
        this.firstName = user.firstName ? user.firstName : "-"
        this.lastName = user.lastName ? user.lastName : "-"
        this.email = user.email ? user.email : "-"
        this.mobileNumber = user.mobileNumber ? user.mobileNumber : "-"
        this.profilePic = user.profilePic ? user.profilePic : "-"
        this.role = user.role ? user.role : "-"
        this.address = user.address ? user.address : {}
        this.personalInfo = user.personalInfo ? user.personalInfo : {}

        this.status = user.status ? user.status : "-"
        this.isDeleted = user.isDeleted ? user.isDeleted : "-"
        this.modifiedOn = user.modifiedOn ? user.modifiedOn : "-"
        this.addedOn = user.addedOn ? user.addedOn : "-"
        this.isActive = user.isActive ? user.isActive : "-"
    }
}