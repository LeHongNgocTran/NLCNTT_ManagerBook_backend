const { ObjectId } = require("mongodb");
class AccountService{
    constructor (client) {
        this.Account = client.db().collection("taikhoan");
    }

    async getAll(){
        const result = await this.Account.find({});
        return await result.toArray();
    }
}

module.exports = AccountService;