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

// API handler pour récupérer les informations d'un utilisateur par son ID
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { id } = req.query;

        // Ouvrir la base de données
        const db = await openDB();

        try {
            // Récupérer les informations de l'utilisateur par son ID
            const user = await db.get('SELECT * FROM Employe WHERE ID_Employe = ?', id);

            if (user) {
                // Répondre avec les informations de l'utilisateur
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération des informations de l\'utilisateur' });
        } finally {
            // Fermer la base de données
            await db.close();
        }
    } else {
        res.status(405).json({ message: 'Méthode non autorisée' });
    }
}