const ApiError = require("../api-error");
const AccountService = require("../services/taikhoan.service");
const MongoDB = require("../utils/mongodb.util");

exports.getAll = async (req, res, next) => {
    let document = [];
    try {
        const accountService = new AccountService(MongoDB.client);
        document = await accountService.getAll();
    }
    catch(error){
        return next(new ApiError(500,"An error occured while get account"));
    }
    return res.send(document);
};