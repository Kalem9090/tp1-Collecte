import express from "express";
import router from "./routes";                 
import medias from "./routes/media";
import users from "./routes/users";
import { loadDB } from "./services/db";
import { requestLogger, errorLogger } from "./middlewares/logging";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLogger);

// Routes
app.use("/api", router);           
app.use("/api/medias", medias);     
app.use("/api/users", users);       


app.get("/api/series/:id/episodes", async (req, res) => {
  try {
    const id = req.params.id;
    const db = await loadDB();
    const serie = db.series.find((s: any) => s.id === id);
    if (!serie) return res.status(404).json({ error: "Série introuvable" });

    const saisons = Array.isArray(serie.saisons) ? serie.saisons : [];
    return res.json({
      serieId: serie.id,
      titre: serie.titre,
      nbSaisons: saisons.length,
      saisons,
    });
  } catch {
    return res.status(500).json({ error: "Erreur interne" });
  }
});


app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});


app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`[tv-tracker] API up on http://localhost:${PORT}`);
});
