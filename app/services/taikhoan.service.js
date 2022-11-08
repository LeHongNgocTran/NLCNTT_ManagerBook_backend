const { ObjectId } = require("mongodb");
class AccountService {
  constructor(client) {
    this.Account = client.db().collection("taikhoan");
    this.ThuThu = client.db().collection("thuthu");
    this.SinhVien = client.db().collection("sinhvien");
  } 
  extractAccountData(payload) {
    const account = {
      mataikhoan : payload.mataikhoan,
      matkhau : payload.matkhau
    }
    Object.keys(account).forEach(
      (key) => account[key] === undefined && delete account[key]
    );
    return account;
  }

  async getAll() {
    const result = await this.Account.find({});
    return await result.toArray();
  }

  async find(filter) {
    const result = await this.Account.find(filter);
    return await result.toArray();
  }
  
  async findByName(data) {
    // console.log(data);
    const taikhoan = this.extractAccountData(data);
    const account = await this.Account.findOne({
      mataikhoan:taikhoan.mataikhoan,
      matkhau: taikhoan.matkhau,
    });
    let user = {};
    const error = true;
    if(account == null){
      return null;
    }
    else {
      switch (account.phanquyen) {
        case 1: {
          user = await this.SinhVien.findOne({ mataikhoan: account.mataikhoan });
          break;
        }
        case 2: {
          user = await this.ThuThu.findOne({ mataikhoan: account.mataikhoan });
          break;
        }
        default:
          break;
      } 
      const result = {...user, phanquyen: account.phanquyen,mataikhoan: account.mataikhoan }
      return result;
    }
    
  }
}

module.exports = AccountService;
