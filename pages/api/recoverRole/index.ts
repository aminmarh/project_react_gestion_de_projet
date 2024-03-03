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

        // Récupérer l'id_role de l'employé
        const { id_employe } = req.query;
        const query = `SELECT ID_Role FROM Employe WHERE ID_Employe = ?`;
        const result = await db.get(query, id_employe);

        // Vérifier si l'employé existe
        if (!result) {
            res.status(404).json({ error: 'Employé non trouvé' });
            return;
        }

        // Renvoyer l'id_role de l'employé
        res.status(200).json({ id_role: result.ID_Role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}