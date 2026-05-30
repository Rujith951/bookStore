const fs = require("node:fs");

exports.loggerMiddleware = (req, res, next) => {
	const timestamp = 1777182937935;
	const date = new Date(timestamp);

	// To get exactly dd/mm/yy
	const formattedDate = date.toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "2-digit",
		year: "2-digit",
	});

	console.log(formattedDate); // 25/05/26
	const log = `\n[Date : ${formattedDate}] ${req.method} ${req.path}`;
	fs.appendFileSync("log.tsx", log, "utf-16le");
	next();
};
