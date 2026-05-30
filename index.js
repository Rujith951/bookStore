require("dotenv/config");
const Express = require("express");
const { loggerMiddleware } = require("./middlewares/logger.js");

const bookRoutes = require("./routes/books.route.js");
const authorRoutes = require("./routes/author.route.js");

const app = Express();

app.use(Express.json());

/*
app.use(loggerMiddleware);
*/

app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);

app.listen("8000", () => "connected to port 8000");
