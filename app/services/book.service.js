const { ObjectId } = require("mongodb");
class BookService {
  constructor(client) {
    this.Book = client.db().collection("sach");
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractBookData(payload) {
    const book = {
      tenNXB: payload.tenNXB,
      tenloai: payload.tenloai,
      tensach: payload.tensach,
      tensach: payload.tensach,
      imageUrl: payload.imageUrl,
      tentacgia: payload.tentacgia,
      stt: payload.stt,
      soke: payload.soke,
      tenday: payload.tenday,
      trangthai: payload.trangthai,
    };
    // Xóa trường không xác định
    Object.keys(book).forEach(
      (key) => book[key] === undefined && delete book[key]
    );
    return book;
  }

  async create(file, payload) {
    const book = this.extractBookData({ ...payload, imageUrl: file.name });
    // console.log(file);
    // console.log(payload);
    const fs = require("fs");
    let folderPath =
      "/home/ngoctran/project/Managerbook-vue/Managerbook/src/assets/images/Book";
    try {
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }
    } catch (err) {
      console.error(err);
    }
    file.mv(`${folderPath}/${file.name}`, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: "Error occured" });
      }
    });
    const result = await this.Book.insertOne(book);
    return result.value;
  }

  async getAll() {
    const result = await this.Book.find({});
    return await result.toArray();
  }

  async findById(id) {
    return await this.Book.findOne({
      _id: new ObjectId(id),
    });
  }

  async delete(id) {
    const result = await this.Book.findOneAndDelete({
      _id: new ObjectId(id),
    });
    return result.value;
  }

  async update(id, file, payload) {
    const filter = { _id: new ObjectId(id) };
    var update = {};
    if (!file) {
      update = this.extractBookData(payload);
      console.log(update); }
    else {

      update = this.extractBookData({
        ...payload,
        imageUrl: file.name
      });
      console.log(update);
      let folderPath =
        "/home/ngoctran/project/Managerbook-vue/Managerbook/src/assets/images/Book";
      file.mv(`${folderPath}/${file.name}`, function (err) {
        if (err) {
          console.log(err);
          return res.status(500).send({ msg: "Error occured" });
        }
      });
    }
    // console.log(2);
    const result = await this.Book.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    // console.log(result.value);
    return result.value;
  }

  async find(filter) {
    const cursor = await this.Book.find(filter);
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name) },
    });
  }

  async updateTrangThai(data) {
    // console.log(data.title);
    // console.log(data.trangthai);
    const result = await this.Book.findOneAndUpdate(
      { tensach: data.title },
      { $set: { trangthai: data.trangthai } },
      { returnDocument: "after" }
    );
    // console.log(result.value);
    return result.value;
  }
}

module.exports = BookService;
