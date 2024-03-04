import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Fonction pour ouvrir la base de données SQLite
async function openDB() {
    return open({
        filename: process.env.DB_PATH||'',
        driver: sqlite3.Database,
    });
}

// Handler de l'API
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Ouvrir la base de données
        const db = await openDB();

        const { id_employe, id_project } = req.query;
        const query = `SELECT TypeAcces FROM Acces WHERE ID_Employe = ? AND ID_Projet = ?`;
        const result = await db.get(query, id_employe, id_project);

        if (!result) {
            res.status(500).json({ error: 'Accès non trouvé' });
            return;
        }
        // Renvoyer les informations de l'accès
        res.status(200).json({ TypeAcces: result.TypeAcces });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}