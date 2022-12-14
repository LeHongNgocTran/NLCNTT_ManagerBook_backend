const ApiError = require("../api-error");
const BookService = require("../services/book.service");
const MongoDB = require("../utils/mongodb.util");
// tạo và lưu trữ một quyển sách mới
exports.create = async (req, res, next) => {
  try {
    // console.log(req.file, req.body);
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.create(req.files.file, req.body);
    // console.log(1);
    // console.log(document);
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "An error occured while creating"));
  }
};

exports.getAll = async (req, res, next) => {
  let documents = [];
  try {
    const bookService = new BookService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await bookService.findByName(name);
    } else {
      documents = await bookService.getAll();
    }
  } catch (error) {
    return next(new ApiError(500, "An error occured while get book"));
  }
  return res.send(documents);
};

exports.getId = async (req, res, next) => {
  try {
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.findById(req.params.id);
    // console.log(document);
    if (!document) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving contact with id=${req.params.id}`)
    );
  }
};
exports.delete = async (req, res, next) => {
  try {
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Contact was deleted successfully"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete contact with id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  try {
    const bookService = new BookService(MongoDB.client);
    if (!req.files) {
    var  document = await bookService.update(
        req.params.id,
        null,
        req.body
      );
    }
    else {
      var document = await bookService.update(
        req.params.id,
        req.files.file,
        req.body
      )
    }

    if (!document) {
      return next(new ApiError(404, "Book not found"));
    }

    return res.send({
      message: "Book was updated successfully",
    });
  } 
  catch (error) {
    return next(
      new ApiError(500, `Error updating contact with id=${req.params.id}`)
    );
  }
};

exports.updateTrangThai = async (req, res, next) => {
  try {
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.updateTrangThai(req.body);
    if (!document) {
      return next(new ApiError(404, "Book can't update"));
    }
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "Error Update"));
  }
};
