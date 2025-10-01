
import { Request, Response, NextFunction } from "express";


const rxTitre = /^[A-Za-z0-9 ]+$/;     
const rxPlateforme = /^[A-Za-z]+$/;      
export const STATUTS = new Set(["en_attente", "en_cours", "terminee"]); 


function bad(res: Response, message: string) {
  return res.status(400).json({ error: message });
}


export function validateFilmBody(req: Request, res: Response, next: NextFunction) {
  const { titre, plateforme, duree, annee } = req.body ?? {};

 
  if (typeof titre !== "string" || !rxTitre.test(titre.trim())) {
    return bad(res, "titre invalide (lettres/chiffres/espaces)");
  }

  if (typeof plateforme !== "string" || !rxPlateforme.test(plateforme.trim())) {
    return bad(res, "plateforme invalide (lettres seulement)");
  }

  if (typeof duree !== "number" || !Number.isInteger(duree) || duree <= 0) {
    return bad(res, "duree invalide (entier positif)");
  }

  if (typeof annee !== "number" || !Number.isInteger(annee)) {
    return bad(res, "annee invalide");
  }
  const current = new Date().getFullYear();
  if (annee > current) {
    return bad(res, "annee invalide (pas de futur)");
  }

  next(); 
}


export function validateSerieBody(req: Request, res: Response, next: NextFunction) {
  const { titre, plateforme, statut } = req.body ?? {};


  if (typeof titre !== "string" || !rxTitre.test(titre.trim())) {
    return bad(res, "titre invalide (lettres/chiffres/espaces)");
  }

  if (typeof plateforme !== "string" || !rxPlateforme.test(plateforme.trim())) {
    return bad(res, "plateforme invalide (lettres seulement)");
  }

  if (typeof statut !== "string" || !STATUTS.has(statut)) {
    return bad(res, "statut invalide (en_attente|en_cours|terminee)");
  }

  next(); 
}
