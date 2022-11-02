const { ObjectId } = require("mongodb");
class BookService {
    constructor(client) {
        this.Book = client.db().collection("sach");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractConactData(payload){
        const book = {
           maNXB : payload.maNXB,
           maloai: payload.maloai,
           masach: payload.masach,
           tensach :payload.tensach,
           imageUrl : payload.imageUrl,
        //    matacgia : payload.matacgia,
           stt: payload.stt, 
           make: payload.make,
           maday : payload.maday,
           trangthai : payload.trangthai
        };
        // Xóa trường không xác định
        Object.keys(book).forEach(
            (key) => book[key] === underfined && delete book[key]
        ); 
        return book;
    }
    async create(payload){
        const book = this.extractConactData(payload);
        const result = await this.Book.findOneAndUpdate(
            book
        );
        return result.value;
    }
    async getAll(){
        const result = await this.Book.find({});
        return await result.toArray();
    }
}
module.exports = BookService;