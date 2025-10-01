
import { Router, Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";
import { loadDB, saveDB } from "../services/db";
import { validateFilmBody, validateSerieBody } from "../middlewares/validation";
import { requireAdmin } from "../middlewares/auth";

const medias = Router();


medias.get("/", async (req: Request, res: Response) => {
  const { type, genre, year } = req.query as {
    type?: "film" | "serie";
    genre?: string;
    year?: string;
  };

  const db = await loadDB();


  let items: Array<any> = [
    ...db.films.map(f => ({ ...f, type: "film" })),
    ...db.series.map(s => ({ ...s, type: "serie" })),
  ];


  if (type) {
    items = items.filter(m => m.type === type);
  }

  if (genre) {
    items = items.filter(m => m.type === "film" && m.genre === genre);
  }

  if (year) {
    const yearInt = parseInt(year, 10);
    if (!isNaN(yearInt)) {
      items = items.filter(m => m.type === "film" && m.annee === yearInt);
    }
  }

  res.json(items);
});


medias.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = await loadDB();

  const film = db.films.find(f => f.id === id);
  if (film) return res.json({ ...film, type: "film" });

  const serie = db.series.find(s => s.id === id);
  if (serie) return res.json({ ...serie, type: "serie" });

  return res.status(404).json({ error: "Media introuvable" });
});


function validateByType(req: Request, res: Response, next: NextFunction) {
  const { type } = req.body || {};
  if (type === "film") return validateFilmBody(req, res, next);
  if (type === "serie") return validateSerieBody(req, res, next);
  return res.status(400).json({ error: 'type requis: "film" ou "serie"' });
}


medias.post("/", requireAdmin, validateByType, async (req: Request, res: Response) => {
  const { type } = req.body as { type: "film" | "serie" };
  const db = await loadDB();

  if (type === "film") {
    const { titre, plateforme, duree, genre, annee, userId } = req.body;
    const film = { id: randomUUID(), titre, plateforme, duree, genre, annee, userId };
    db.films.push(film);
    await saveDB(db);
    return res.status(201).json({ ...film, type: "film" });
  }


  const { titre, plateforme, statut, userId, saisons } = req.body;
  const serie = { id: randomUUID(), titre, plateforme, statut, userId, saisons: Array.isArray(saisons) ? saisons : [] };
  db.series.push(serie);
  await saveDB(db);
  return res.status(201).json({ ...serie, type: "serie" });
});


medias.put("/:id", requireAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = await loadDB();


  const idxFilm = db.films.findIndex(f => f.id === id);
  if (idxFilm !== -1) {
    return validateFilmBody(req, res, async () => {
      const { titre, plateforme, duree, genre, annee, userId } = req.body;
      db.films[idxFilm] = { id, titre, plateforme, duree, genre, annee, userId };
      await saveDB(db);
      return res.json({ ...db.films[idxFilm], type: "film" });
    });
  }


  const idxSerie = db.series.findIndex(s => s.id === id);
  if (idxSerie !== -1) {
    return validateSerieBody(req, res, async () => {
      const { titre, plateforme, statut, userId, saisons } = req.body;
      db.series[idxSerie] = { id, titre, plateforme, statut, userId, saisons: Array.isArray(saisons) ? saisons : [] };
      await saveDB(db);
      return res.json({ ...db.series[idxSerie], type: "serie" });
    });
  }


  return res.status(404).json({ error: "Media introuvable" });
});


medias.delete("/:id", requireAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = await loadDB();

  const beforeFilms = db.films.length;
  db.films = db.films.filter(f => f.id !== id);

  const beforeSeries = db.series.length;
  db.series = db.series.filter(s => s.id !== id);


  if (db.films.length === beforeFilms && db.series.length === beforeSeries) {
    return res.status(404).json({ error: "Media introuvable" });
  }

  await saveDB(db);
  return res.status(204).send();
});

export default medias;
