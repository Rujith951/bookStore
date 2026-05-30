const express = require("express");
const { LoggerMiddleware } = require("../middlewares/logger");

const controller = require("../controllers/book.controller");

const router = express.Router({ caseSensitive: true });

console.log("Router in bookRouter", router);

router.get("/", controller.getAllBooks);

router.get("/:id", controller.getBookById);

router.post("/create", controller.createBook);

router.delete("/delete/:id", controller.deleteBookById);

module.exports = router;
