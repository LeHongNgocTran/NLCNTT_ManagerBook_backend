const express = require("express");
const books = require("../controllers/book.controller");

const router = express.Router();
// Trong đoạn code trên, chúng ta định nghĩa các route quản lý liên hệ được hỗ trợ bởi ứng dụng
// web. Mỗi route là sự kết hợp của đường dẫn, phương thức HTTP (GET, POST, PUT, DELETE) và
// đoạn code xử lý.
router.route("/")
    .get(books.getAll)
    // .post(books.create)
    // .delete(books.deleteAll);

router.route("/:id")
    .get(books.findOne)
    .delete(books.delete)
    .put(books.update);


module.exports = router;