const { ObjectId } = require("mongodb");

class GiaHanService {
  constructor(client) {
    this.GiaHan = client.db().collection("phieugiahan");
    this.SinhVien = client.db().collection("sinhvien");
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
    const result = await this.GiaHan.findOneAndUpdate(
      filter,
      { $set: data },
      { returnDocument: "after" }
    );
    if(result.value.trangthai === true) {
      const inforuser = await this.SinhVien.findOne({
        masinhvien: result.value.masinhvien,
      });
      console.log(inforuser);
        var dateTime = new Date(result.value.thoigiangiahan);
        var date = dateTime.getDate() + '-' + (dateTime.getMonth() + 1) + '-' + dateTime.getFullYear();
        var time = dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds();
        const formattime =  time + ' ' + date;
  
      const nodemailer = require("nodemailer");
      console.log(process.env.EMAIL);
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD      
      },
    });

    let infor = { 
      from: process.env.EMAIL, // sender address
      to:  inforuser.email, // list of receivers
      subject: "THÔNG BÁO KẾT QUẢ DUYỆT PHIẾU GIA HẠN", // Subject line
      text: "BẠN NHẬN ĐƯỢC THÔNG BÁO TỪ THƯ VIỆN TRƯỜNG CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG - ĐẠI HỌC CẦN THƠ", // plain text body
      html: 
        "<b>Xin chào</b>&nbsp;" 
        + inforuser.hoten +
        "<h4>ĐƠN GIA HẠN CỦA BẠN ĐÃ ĐƯỢC DUYỆT</h4>" +
        "<p>Thời hạn phiếu mượn được kéo dài đến : " 
        + formattime + "</p>" +
        "<strong>Vui lòng trả trong khoảng thời gian gia hạn này. Nếu không bạn sẽ bị phạt tiền 5000 VNĐ / cuốn </strong>" 
        +"<h6>TRÂN TRỌNG CÁM ƠN !</h6>"// html body
    };

    transporter.sendMail(infor, function (err,infor){
      if(err){
        console.log(err);
      }
      else {
        console.log("Message sent:" + infor.response);
      }
    });
    }
    return result.value;
  }
}
module.exports = GiaHanService;
