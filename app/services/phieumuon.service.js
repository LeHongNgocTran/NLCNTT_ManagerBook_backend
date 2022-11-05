const { ObjectId } = require("mongodb");

class PhieuMuonService {
  constructor(client) {
    this.PhieuMuon = client.db().collection("phieumuon");
    this.SinhVien  = client.db().collection("sinhvien");
    this.TaiKhoan = client.db().collection("taikhoan");
  }
// Hàm kiểm tra dữ liệu đúng hay không, có trường nào dư không
  extractConactData(payload) {
    const phieumuon = {
      _id: payload._id,
      masinhvien: payload.masinhvien,
      trangthai: payload.trangthai,
    };
    // Xóa trường không xác định
    Object.keys(phieumuon).forEach(
      (key) => phieumuon[key] === underfined && delete taikhoan[key]
    );
    return phieumuon;
  }

  // extractConactData(payload) {
  //   const sinhvien = {
  //     mataikhoan: payload.mataikhoan,
  //     masinhvien : payload.masinhvien,
  //     hoten: payload.hoten,
  //     ngaysinh: payload.ngaysinh,
  //     diachi: payload.diachi,
  //     sdt: payload.sdt
  //   }
  //   // Xóa trường không xác định
  //   Object.keys(taikhoan).forEach(
  //     (key) => taikhoan[key] === underfined && delete taikhoan[key]
  //   );
  //   return taikhoan;
  // }

  // extractConactData(payload){
  //   const taikhoan = {
  //     mataikhoan: payload.mataikhoan,
  //     password: payload.password,
  //     phanquyen: payload.phanquyen
  //   }
  // }
    
  async getAllInfor(){
console.log(1);
    // Đếm số tự động
    // function getNextSequence(name){
    //   var ret = db().collection("counters").findAndModify({
    //     query: { _id: name},
    //     update: {$inc : {seq:1}},
    //     new: true
    //   });
    //   return ret.seq;
    // } 
    const resultAll = await this.PhieuMuon.aggregate([
      {
        $lookup: {
          from : 'sinhvien',
          localField: 'masinhvien',
          foreignField: 'masinhvien',
          as: 'thongtinsinhvien'
        }}
    ]);
    return await resultAll.toArray();
  }
  // const resultPhieuMuon = await this.PhieuMuon.find({});
    // const resultTaiKhoan = await this.TaiKhoan.find({});
    // const resultSinhvien = await this.SinhVien.find({});

    // console.log(await resultPhieuMuon.toArray());
    // console.log(await resultTaiKhoan.toArray());
    // console.log(await resultSinhvien.toArray());
}

module.exports = PhieuMuonService;