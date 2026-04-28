import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const players = sqliteTable("players", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  playerNo: text("player_no").notNull().unique(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  phone: text("phone").notNull(),
  photo: text("photo").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Add more tables as needed