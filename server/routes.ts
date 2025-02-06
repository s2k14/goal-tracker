import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { generateMicroTasks } from "./ai";
import { insertGoalSchema, insertTaskSchema } from "@shared/schema";

export function registerRoutes(app: Express) {
  app.post("/api/goals", async (req, res) => {
    try {
      const goal = insertGoalSchema.parse(req.body);
      const created = await storage.createGoal(goal);
      
      // Generate initial tasks
      const tasks = await generateMicroTasks(goal.title, goal.category);
      for (const description of tasks) {
        await storage.createTask({
          goalId: created.id,
          description,
          completed: false,
          date: new Date(),
        });
      }
      
      res.json(created);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/goals", async (req, res) => {
    const goals = await storage.getGoals();
    res.json(goals);
  });

  app.get("/api/goals/:id", async (req, res) => {
    const goal = await storage.getGoal(Number(req.params.id));
    if (!goal) return res.status(404).json({ error: "Goal not found" });
    res.json(goal);
  });

  app.patch("/api/goals/:id", async (req, res) => {
    try {
      const updated = await storage.updateGoal(Number(req.params.id), req.body);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/goals/:id/tasks", async (req, res) => {
    const tasks = await storage.getTasks(Number(req.params.id));
    res.json(tasks);
  });

  app.post("/api/tasks", async (req, res) => {
    try {
      const task = insertTaskSchema.parse(req.body);
      const created = await storage.createTask(task);
      res.json(created);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/tasks/:id", async (req, res) => {
    try {
      const updated = await storage.updateTask(Number(req.params.id), req.body);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/tasks/today", async (req, res) => {
    const tasks = await storage.getTasksForDate(new Date());
    res.json(tasks);
  });

  const httpServer = createServer(app);
  return httpServer;
}
