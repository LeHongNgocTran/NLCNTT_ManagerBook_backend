const { ObjectId } = require("mongodb");

class PhieuMuonService {
  constructor(client) {
    this.PhieuMuon = client.db().collection("phieumuon");
    this.SinhVien = client.db().collection("sinhvien");
    this.TaiKhoan = client.db().collection("taikhoan");
  }
  // Hàm kiểm tra dữ liệu đúng hay không, có trường nào dư không
  extractPhieuMuonData(payload) {
    const phieumuon = {
      _id: payload._id,
      masinhvien: payload.masinhvien,
      hoten: payload.hoten,
      trangthai: payload.trangthai,
      danhsachsach: payload.danhsachsach,
      dateTimeStart: payload.dateTimeStart,
      dateTimeEnd: payload.dateTimeEnd,
      thoigiantrasach: payload.thoigiantrasach
    };
    // Xóa trường không xác định
    Object.keys(phieumuon).forEach(
      (key) => phieumuon[key] === undefined && delete phieumuon[key]
    );
    return phieumuon;
  }

  async getAllInfor() {
    const resultAll = await this.PhieuMuon.aggregate([
      {
        $lookup: {
          from: "sinhvien",
          localField: "masinhvien",
          foreignField: "masinhvien",
          as: "thongtinsinhvien",
        },
      },
    ]);
    
    return await resultAll.toArray();
  }

  async create(payload) {
    // console.log(payload);
    const phieumuon = this.extractPhieuMuonData(payload);
    // console.log(payload);
    const result = await this.PhieuMuon.insertOne(phieumuon);
    // console.log(result.value);
    return result.value;
  }

  async findById(id) {
    return await this.PhieuMuon.findOne({
      _id: id,
    });
  }

  async update(id, data) {
    const filter = { _id: id };
    const result = await this.PhieuMuon.findOneAndUpdate(
      filter,
      { $set: data },
      { returnDocument: "after" }
    );

    return result.value;
  }

  async getAllPhieuMuonByMSSV(mssv) {
    const result = await this.PhieuMuon.find(mssv);
    return await result.toArray();
  }
}

module.exports = PhieuMuonService;
