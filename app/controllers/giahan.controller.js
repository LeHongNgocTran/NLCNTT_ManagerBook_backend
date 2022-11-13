const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const PhieuGiaHanService = require("../services/giahan.service");

exports.getAllPhieuGiaHan = async (req, res, next) => {
  let documents = [];
  try {
    // console.log('avc');
    const phieugiahanService = new PhieuGiaHanService(MongoDB.client);
    documents = await phieugiahanService.getAllPhieuGiaHan();
    // console.log(documents);
  } catch (error) {
    return next(
        new ApiError(500, "Can not get phieu muon"));
  }
  return res.send(documents);
};

exports.createPhieuGiaHan = async (req, res,next) => {
  try {
    const phieugiahanService = new PhieuGiaHanService(MongoDB.client);
    const document = await phieugiahanService.create(req.body);
    // console.log(document);
    return res.send(document);
  }
  catch (error){
    return next(new ApiError(500, "Không thể tạo phiêu gia hạn"));
  }
}

exports.getInforById = async (req,res,next) => {
  try{
    // console.log('abc');
    const phieugiahanService = new PhieuGiaHanService(MongoDB.client);
    const document = await phieugiahanService.getById(req.params.id);
    // console.log(document);
    return res.send(document);
  }
  catch(error){
    return next(new ApiError(500,`Không thể lấy theo id = ${req.params.id}`))
  }
}
exports.getInforDetails = async (req,res,next) => {
  try{
    const phieugiahanService = new PhieuGiaHanService(MongoDB.client);
    const document = await phieugiahanService.getInforDetails(req.body);
    console.log(document)
    return res.send(document);
  }
  catch(error){
    return next(new ApiError(500,"Không thể lấy " ))
  }
}
