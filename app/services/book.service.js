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

  async create(payload) {
    // console.log(payload);
    const book = this.extractBookData(payload);
    const result = await this.Book.insertOne(
        book);
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

  async update(id, payload) {
    const filter = { _id: new ObjectId(id) };
    const update = this.extractBookData(payload);
    const result = await this.Book.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }

  async find(filter){
    const cursor = await this.Book.find(filter);
    return await cursor.toArray();
  }

  async findByName(name){
    return await this.find({
      name : {$regex: new RegExp(name)}
    });
  }
}

module.exports = BookService;
