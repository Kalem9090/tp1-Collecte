import { Router, Request, Response } from "express";
import { getLastAction } from "../middlewares/logging";

const router = Router();


router.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true, service: "tv-tracker", version: "1.0.0" });
});


router.get("/logs", (_req: Request, res: Response) => {
  const last = getLastAction();
  res.json({ lastAction: last });
});

export default router;
