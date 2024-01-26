class UserDetailResponse{

    constructor(result){
        this.firstName = result.name;
        this.email = result.email;
        this.gender = result.gender;
        this.address = result.address;
    }

}

module.exports = UserDetailResponse;