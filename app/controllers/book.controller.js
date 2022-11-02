const ApiError = require("../api-error");
const BookService = require("../services/book.service");
const MongoDB = require("../utils/mongodb.util");
// tạo và lưu trữ một quyển sách mới
exports.create = async (req, res) => {
  if (!req.body?.tensach) {
    return next(new ApiError(400, "Name can not be empty"));
  }
  try {
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "An error occured while creating"));
  }
};

exports.getAll = async (req, res, next) => {
  let documents = [];
  try {
    const bookService = new BookService(MongoDB.client);
    documents = await bookService.getAll();
    console.log(documents[0]);
  } catch (error) {
    return next(new ApiError(500, "An error occured while get book"));
  }
  return res.send(documents[0]);
};

exports.findOne = (req, res) => {
  res.send({ message: "findOne handler" });
};

exports.update = (req, res) => {
  res.send({ message: "update handler" });
};

exports.delete = (req, res) => {
  res.send({ message: "delete handler" });
};

exports.deleteAll = (req, res) => {
  res.send({ message: "deleteAll handler" });
};
