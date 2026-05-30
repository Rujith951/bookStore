const { books } = require("../models/book.model");
const db = require("../db");
const booksTable = require("../models/book.model");
const { eq, ilike, sql } = require("drizzle-orm");
const authorsTable = require("../models/author.model");

exports.getAllBooks = async (req, res) => {
	const search = req.query.search;

	if (search) {
		const books = await db
			.select()
			.from(booksTable)
			// .where(ilike(booksTable.title, `%${search}%`)); ---> not perfomance
			.where(
				sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', $(title))`,
			);

		return res.json(books);
	}

	const books = await db.select().from(booksTable);
	res.json(books);
};

exports.getBookById = async (req, res) => {
	const id = req.params.id;

	const [book] = await db
		.select()
		.from(booksTable)
		.where(eq(booksTable.id, id))
		.leftJoin(authorsTable, eq(authorsTable.id, booksTable.authorId))
		.limit(1);

	if (!book) return res.status(401).json({ error: "book not found" });

	res.json(book);
};

exports.createBook = async (req, res) => {
	const { title, description, authorId } = req.body;

	if (!title || !authorId)
		return res.status(400).json({ error: "all fields are requeired" });

	const [result] = await db
		.insert(booksTable)
		.values({ title, description, authorId })
		.returning();

	if (result.id) {
		return res
			.status(201)
			.json({ success: "added successfully", book: result });
	} else {
		return res.status(201).json({ error: "failed to update" });
	}
};

// exports.deleteBookById = async (req, res) => {
// 	const id = req.params.id;
// 	if (!id) {
// 		return res.status(400).json({ error: `id must have to pass` });
// 	}

// 	const [deletedBook] = await db
// 		.delete(booksTable)
// 		.where(eq(booksTable.id, id))
// 		.returning({ deletedId: booksTable.id });

// 	if (deletedBook) {
// 		return res.status(200).json({
// 			success: `Record  with this ${id} deleted successfully`,
// 			bookId: deletedBook,
// 		});
// 	} else {
// 		return res.status(201).json({ error: "failed to delete" });
// 	}
// };

exports.deleteBookById = async (req, res) => {
	const { id } = req.params;

	console.log("Attempting to delete ID:", id); // Check if this matches your DB exactly

	try {
		const result = await db
			.delete(booksTable)
			.where(eq(booksTable.id, id))
			.returning({ deletedId: booksTable.id });

		console.log("Query Result:", result); // If this is [], the ID wasn't found

		if (result.length > 0) {
			return res.status(200).json({
				success: true,
				message: `Record ${id} deleted`,
				bookId: result[0].deletedId,
			});
		} else {
			// Use 404 here - it's more accurate than 201
			return res.status(404).json({ error: "No book found with that ID" });
		}
	} catch (err) {
		console.error("SQL Error:", err);
		return res.status(500).json({ error: "Database error" });
	}
};
