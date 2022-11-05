const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const PhieuMuonService = require("../services/phieumuon.service");

exports.getAllPhieu = async (req,res,next) => {
    let documents = [];
    try{
        const phieumuonService = new PhieuMuonService(MongoDB.client);
        documents = await phieumuonService.getAllInfor();
        console.log(documents);
        console.log('avc');
    }
    catch(error){
        return next(new ApiError(500, "An error occured while get phieumuon"));
    }
    return res.send(documents);
}
