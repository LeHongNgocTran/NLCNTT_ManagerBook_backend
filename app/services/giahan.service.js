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
    return await result.toArray();
  }

  async getInforDetails(maphieumuon) {
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
      subject: "TH??NG B??O K???T QU??? DUY???T PHI???U GIA H???N", // Subject line
      text: "B???N NH???N ???????C TH??NG B??O T??? TH?? VI???N TR?????NG C??NG NGH??? TH??NG TIN V?? TRUY???N TH??NG - ?????I H???C C???N TH??", // plain text body
      html: 
        "<b>Xin ch??o</b>&nbsp;" 
        + inforuser.hoten +
        "<h4>????N GIA H???N C???A B???N ???? ???????C DUY???T</h4>" +
        "<p>Th???i h???n phi???u m?????n ???????c k??o d??i ?????n : " 
        + formattime + "</p>" +
        "<strong>Vui l??ng tr??? trong kho???ng th???i gian gia h???n n??y. N???u kh??ng b???n s??? b??? ph???t ti???n 5000 VN??/ng??y/cu???n </strong>" 
        +"<h3>TR??N TR???NG C??M ??N !</h3>"
        + "<h2>VUI L??NG KH??NG PH???N H???I MAIL N??Y"
        // html body
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
