import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const goals = pgTable("goals", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  targetDate: timestamp("target_date").notNull(),
  completed: boolean("completed").notNull().default(false),
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  goalId: integer("goal_id").notNull(),
  description: text("description").notNull(),
  completed: boolean("completed").notNull().default(false),
  date: timestamp("date").notNull(),
});

// Modified schema to handle date strings from the form
export const insertGoalSchema = createInsertSchema(goals, {
  targetDate: z.string().transform((date) => new Date(date)),
}).omit({ id: true, completed: true });

export const insertTaskSchema = createInsertSchema(tasks).omit({ id: true });

export type InsertGoal = z.infer<typeof insertGoalSchema>;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Goal = typeof goals.$inferSelect;
export type Task = typeof tasks.$inferSelect;

export const goalCategories = [
  "Career",
  "Health",
  "Education",
  "Personal",
  "Finance",
] as const;