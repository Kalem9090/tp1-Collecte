
import { Router, Request, Response } from "express";
import { loadDB } from "../services/db";

const users = Router();


users.get("/:id/medias", async (req: Request, res: Response) => {
  const id = req.params.id;           
  const db = await loadDB();


  const films = db.films.filter(f => f.userId === id);
  const series = db.series.filter(s => s.userId === id);

  return res.json({
    userId: id,
    totals: {
      films: films.length,
      series: series.length,
      total: films.length + series.length
    },
    films,   
    series   
  });
});

export default users;
