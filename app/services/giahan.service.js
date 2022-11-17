const { ObjectId } = require("mongodb");

class GiaHanService {
  constructor(client) {
    this.GiaHan = client.db().collection("phieugiahan");
  }

  extractGiaHanData(payload) {
    const phieugiahan = {
      maphieumuon: payload.maphieumuon,
      masinhvien : payload.masinhvien,
      thoigiangiahan: payload.thoigiangiahan,
      trangthai: payload.trangthai,
    };
    Object.keys(phieugiahan).forEach(
      (key) => phieugiahan[key] === undefined && delete phieugiahan[key]
    );
    return phieugiahan;
  }

  async getAllPhieuGiaHan() {
    const resultAll = await this.GiaHan.aggregate([
      {
        $lookup: {
          from: "phieumuon",
          localField: "maphieumuon",
          foreignField: "_id",
          as: "thongtingiahan",
        },
      },
    ]);
    return await resultAll.toArray();
  }

  async create(payload) {
    const phieugiahan = this.extractGiaHanData(payload);
    const result = await this.GiaHan.insertOne(phieugiahan);
    return result.value;
  }

  async getById(id) {
    return await this.GiaHan.findOne({
      _id: new ObjectId(id),
    });
  }

  async getInforUser(masinhvien) {
    const result = this.GiaHan.aggregate([
      {
        $lookup: {
          from: "phieumuon",
          localField: "maphieumuon",
          foreignField: "_id",
          as: "thongtingiahan",
        },
      },
      {
        $unwind: "$thongtingiahan",
      },
      {$match : masinhvien}
    ]);
    // console.log( await result.toArray());
    return await result.toArray();
  }

  async getInforDetails(maphieumuon) {
    // console.log(maphieumuon);
    const result = this.GiaHan.aggregate([
      {
        $lookup: {
          from: "phieumuon",
          localField: "maphieumuon",
          foreignField: "_id",
          as: "thongtingiahan",
        },
      },
      {
        $unwind: "$thongtingiahan",
      },
      {
        $match: maphieumuon,
      },
    ]);
    return await result.toArray();
  }
  async duyetphieu(id, data) {
    const filter = { _id: new ObjectId(id) };
    // console.log(id,data);
    const result = await this.GiaHan.findOneAndUpdate(
      filter,
      { $set: data },
      { returnDocument: "after" }
    );
    return result.value;
  }
}
module.exports = GiaHanService;
