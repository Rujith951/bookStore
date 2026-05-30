const { pgTable, uuid, varchar } = require("drizzle-orm/pg-core");

const authorsTable = pgTable("authors", {
	id: uuid().primaryKey().defaultRandom(),
	firstName: varchar({ length: 55 }).notNull(),
	secondName: varchar({ length: 55 }),
	email: varchar({ length: 255 }).notNull().unique(),
});

module.exports = authorsTable;
