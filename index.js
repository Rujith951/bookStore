require("dotenv/config");
const Express = require("express");
const { loggerMiddleware } = require("./middlewares/logger.js");

const bookRoutes = require("./routes/books.route.js");
const authorRoutes = require("./routes/author.route.js");

const app = Express();

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	if (req.method === "OPTIONS") {
		return res.sendStatus(204);
	}
	next();
});

app.use(Express.json());

/*
app.use(loggerMiddleware);
*/

app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);

app.listen(8000, () => console.log("connected to port 8000"));
