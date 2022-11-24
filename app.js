// Khai báo
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload")
const ApiError = require("./app/api-error");

const bookRouter = require("./app/routes/book.route");
const phieumuonRouter = require("./app/routes/phieumuon.route");
const accountRouter = require('./app/routes/taikhoan.route');
const giahanRouter =  require('./app/routes/phieugiahan.route');

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Router của sách
app.use("/api/book",bookRouter);

//Router của phiếu mượn
app.use("/api/phieumuon",phieumuonRouter);

//Router của tài khoản
app.use("/api/account",accountRouter);

// Router của phiêu gia hạn
app.use("/api/phieugiahan",giahanRouter);

//Router của phiếu mượn cần được gia hạn
// Handle 404 respone
app.use((req, res, next) => {
  // Code ở đây sẽ chạy khi không có route được định nghĩa nào
  // khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
  // thể hiện lỗi 404
  return next(new ApiError(404, "Resource not found"));
});

// define error-handling middleware last, after other app.use() and routes calls

app.use((error, req, res, next) => {
  // Middleware xử lý lỗi tập trung.
  // Trong các đoạn code xử lý ở các route, gọi next(error)
  // sẽ chuyển về middleware xử lý lỗi này
  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;

