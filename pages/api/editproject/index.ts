import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Chemin de la base de données
const dbPath = process.env.DB_PATH;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            // Ouvrir la connexion à la base de données
            const db = await open({
                filename: dbPath||'',
                driver: sqlite3.Database,
            });

            // Récupérer les données du corps de la requête
            const { id, nom, description } = req.body;

            // Mettre à jour le projet dans la base de données
            await db.run('UPDATE Projet SET Nom = ?, Description = ? WHERE ID_Projet = ?', [nom, description, id]);

            // Fermer la connexion à la base de données
            await db.close();

            res.status(200).json({ message: 'Projet mis à jour avec succès' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du projet' });
        }
    } else {
        res.status(405).json({ message: 'Méthode non autorisée' });
    }
}