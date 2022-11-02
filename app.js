// Khai báo
const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const managerRouter = require("./app/routes/manager.route");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/managerlibrary", managerRouter);

// Handle 404 respone
app.use((req, res, next) => {
  // Code ở đây sẽ chạy khi không có route được định nghĩa nào
  // khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
  // thể hiện lỗi 404
  return next(new ApiError(404, "Resource not foundfdghjk"));
});

//// define error-handling middleware last, after other app.use() and routes calls

app.use((error, req, res, next) => {
  // Middleware xử lý lỗi tập trung.
  // Trong các đoạn code xử lý ở các route, gọi next(error)
  // sẽ chuyển về middleware xử lý lỗi này
  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
