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

// Handler de l'API POST
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    try {
        // Ouvrir la base de données
        const db = await openDB();

        // Récupérer les données de la requête
        const { id, titre, description, effort, etat, idProjet, typeTache } = req.body;

        // Mettre à jour la tâche dans la base de données
        await db.run(
            `UPDATE Tache SET Titre = ?, Description = ?, Effort = ?, Etat = ?, ID_Projet = ?, TypeTache = ? WHERE ID_Tache = ?`,
            [titre, description, effort, etat, idProjet, typeTache, id]
        );

        // Fermer la base de données
        await db.close();

        res.status(200).json({ message: 'Tâche mise à jour avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de la tâche' });
    }
}