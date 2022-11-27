const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const PhieuMuonService = require("../services/phieumuon.service");

exports.getAllPhieu = async (req, res, next) => {
  let documents = [];
  try {
    const phieumuonService = new PhieuMuonService(MongoDB.client);
    documents = await phieumuonService.getAllInfor();
    // console.log(documents);
    // console.log('avc');
  } catch (error) {
    return next(new ApiError(500, "An error occured while get phieumuon"));
  }
  return res.send(documents);
};

exports.create = async (req, res, next) => {
  try {
    const phieumuonService = new PhieuMuonService(MongoDB.client);
    const document = await phieumuonService.create(req.body);
    // console.log(document);
    return await res.send(document);
  } catch (error) {
    return next(new ApiError(500, "Không thể tạo phiêu mượn"));
  }
};

exports.getId = async (req, res, next) => {
  try {
    const phieumuonService = new PhieuMuonService(MongoDB.client);
    const document = await phieumuonService.findById(req.params.id);
    // console.log(document);
    if (!document) {
      return next(new ApiError(404, "Oke Not Found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving phieumuon with id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  // console.log(req.body);
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  try {
    const phieumuonService = new PhieuMuonService(MongoDB.client);
    const document = await phieumuonService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Not update phieumuon"));
    }
    // console.log(document)
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, `Không thể duyệt được id=${req.params.id}`));
  }
};

exports.getAllPhieuMuonByName = async (req, res, next) => {
  try {
    const phieumuonService = new PhieuMuonService(MongoDB.client);
    const document = await phieumuonService.getAllPhieuMuonByMSSV(req.body);
    if (!document) {
      return next(new ApiError(400, "No get"));
    }
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, `Không thể lấy dữ liệu`));
  }
};
