import { Request, Response, NextFunction } from "express";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const role = req.header("x-role");
  if (role !== "admin") return res.status(403).json({ error: "Accès réservé aux administrateurs" });
  next();
}
