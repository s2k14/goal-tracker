import { type Goal, type InsertGoal, type Task, type InsertTask } from "@shared/schema";

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

export class MemStorage implements IStorage {
  private goals: Map<number, Goal>;
  private tasks: Map<number, Task>;
  private goalId: number;
  private taskId: number;

  constructor() {
    this.goals = new Map();
    this.tasks = new Map();
    this.goalId = 1;
    this.taskId = 1;
  }

  async createGoal(goal: InsertGoal): Promise<Goal> {
    const id = this.goalId++;
    const newGoal: Goal = { ...goal, id, completed: false };
    this.goals.set(id, newGoal);
    return newGoal;
  }

  async getGoals(): Promise<Goal[]> {
    return Array.from(this.goals.values());
  }

  async getGoal(id: number): Promise<Goal | undefined> {
    return this.goals.get(id);
  }

  async updateGoal(id: number, goal: Partial<Goal>): Promise<Goal> {
    const existing = this.goals.get(id);
    if (!existing) throw new Error("Goal not found");
    const updated = { ...existing, ...goal };
    this.goals.set(id, updated);
    return updated;
  }

  async createTask(task: InsertTask): Promise<Task> {
    const id = this.taskId++;
    const newTask: Task = { 
      ...task, 
      id,
      completed: task.completed ?? false
    };
    this.tasks.set(id, newTask);
    return newTask;
  }

  async getTasks(goalId: number): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(task => task.goalId === goalId);
  }

  async updateTask(id: number, task: Partial<Task>): Promise<Task> {
    const existing = this.tasks.get(id);
    if (!existing) throw new Error("Task not found");
    const updated = { ...existing, ...task };
    this.tasks.set(id, updated);
    return updated;
  }

  async getTasksForDate(date: Date): Promise<Task[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return Array.from(this.tasks.values()).filter(
      task => task.date >= startOfDay && task.date <= endOfDay
    );
  }
}

export const storage = new MemStorage();