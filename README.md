## TV Tracker — TP1

Petite API en Node + Express pour gérer des films et des séries.

## Démarrer
```bash
npm install
npm run dev
L’API tourne sur: http://localhost:3000

Endpoints
GET /api/health

GET /api/logs

GET /api/medias
(filtres: type=film|serie, genre, year → genre/year sur les films)

GET /api/medias/:id

POST /api/medias (admin)

PUT /api/medias/:id (admin)

DELETE /api/medias/:id (admin)

GET /api/series/:id/episodes
(défini dans src/app.ts, renvoie saisons + épisodes)

GET /api/users/:id/medias

Admin
Pour POST/PUT/DELETE, ajouter ce header:

pgsql
Copier le code
x-role: admin
Structure
src/app.ts : point d’entrée + routes montées

src/routes/ : index.ts, media.ts, users.ts

src/middlewares/ : logging.ts, auth.ts, validation.ts

src/services/db.ts : lecture/écriture du fichier JSON

src/data/db.json : données locales

logs/ : dossier des logs (fichiers créés au run)

Postman
Importer postman/tv-tracker.postman_collection.json et tester les routes.

Copier le code
