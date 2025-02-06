import { type Goal, type InsertGoal, type Task, type InsertTask } from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte } from "drizzle-orm";
import { goals, tasks } from "@shared/schema";

export interface IStorage {
  createGoal(goal: InsertGoal): Promise<Goal>;
  getGoals(): Promise<Goal[]>;
  getGoal(id: number): Promise<Goal | undefined>;
  updateGoal(id: number, goal: Partial<Goal>): Promise<Goal>;
  createTask(task: InsertTask): Promise<Task>;
  getTasks(goalId: number): Promise<Task[]>;
  updateTask(id: number, task: Partial<Task>): Promise<Task>;
  getTasksForDate(date: Date): Promise<Task[]>;
}

export class DatabaseStorage implements IStorage {
  async createGoal(goal: InsertGoal): Promise<Goal> {
    const [created] = await db.insert(goals).values(goal).returning();
    return created;
  }

  async getGoals(): Promise<Goal[]> {
    return await db.select().from(goals);
  }

  async getGoal(id: number): Promise<Goal | undefined> {
    const [goal] = await db.select().from(goals).where(eq(goals.id, id));
    return goal;
  }

  async updateGoal(id: number, goal: Partial<Goal>): Promise<Goal> {
    const [updated] = await db
      .update(goals)
      .set(goal)
      .where(eq(goals.id, id))
      .returning();
    if (!updated) throw new Error("Goal not found");
    return updated;
  }

  async createTask(task: InsertTask): Promise<Task> {
    const [created] = await db.insert(tasks).values(task).returning();
    return created;
  }

  async getTasks(goalId: number): Promise<Task[]> {
    return await db.select().from(tasks).where(eq(tasks.goalId, goalId));
  }

  async updateTask(id: number, task: Partial<Task>): Promise<Task> {
    const [updated] = await db
      .update(tasks)
      .set(task)
      .where(eq(tasks.id, id))
      .returning();
    if (!updated) throw new Error("Task not found");
    return updated;
  }

  async getTasksForDate(date: Date): Promise<Task[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return await db
      .select()
      .from(tasks)
      .where(
        and(
          gte(tasks.date, startOfDay),
          lte(tasks.date, endOfDay)
        )
      );
  }
}

export const storage = new DatabaseStorage();