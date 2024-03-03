import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { NextApiRequest, NextApiResponse } from 'next';

// Fonction pour ouvrir la base de données SQLite
async function openDatabase() {
    return open({
        filename: process.env.DB_PATH||'',
        driver: sqlite3.Database,
    });
}

// API handler pour la route GET /api/projets/:id/taches
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    try {
        // Ouvrir la base de données
        const db = await openDatabase();

        // Récupérer toutes les tâches liées au projet spécifié
        const taches = await db.all(
            'SELECT * FROM Tache WHERE ID_Projet = ?',
            id
        );

        // Fermer la base de données
        await db.close();

        // Répondre avec les tâches récupérées
        res.status(200).json(taches);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des tâches.' });
    }
}