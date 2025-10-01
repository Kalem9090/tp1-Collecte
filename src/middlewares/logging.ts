import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import logger from "../services/logger"


export function requestLogger(req: Request, res: Response, next: NextFunction) {
   logger.info(`${req.method} ${req.originalUrl}`); 
    next();
}


export function errorLogger(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error(`${req.method} ${req.originalUrl} - ${err?.message || err}`);
  res.status(err?.status || 500).json({ error: "Erreur interne" });
}


export function getLastAction(): string | null {
  try {
    const file = path.join(process.cwd(), "logs", "app.log");
    if (!fs.existsSync(file)) return null;
    const lines = fs.readFileSync(file, "utf-8").trim().split("\n");
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i].trim();
      if (line) return line;
    }
    return null;
  } catch {
    return null;
  }
  }