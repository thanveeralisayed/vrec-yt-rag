import { integer, varchar, snakeCase } from "drizzle-orm/pg-core";

export const usersTable = snakeCase.table("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
});
