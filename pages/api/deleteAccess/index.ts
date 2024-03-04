import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Chemin de la base de données SQLite
const DB_PATH = process.env.DB_PATH || '';

// Fonction pour ouvrir la base de données
async function openDatabase() {
    return open({
        filename: DB_PATH,
        driver: sqlite3.Database,
    });
}

// API handler pour la requête POST de suppression de projet
export default async function deleteProjectHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { ID_Acces } = req.query;

        // Vérifier si l'ID du projet est fourni
        if (!ID_Acces) {
            return res.status(400).json({ message: "Veuillez fournir l'id de lacces" });
        }

        try {
            // Ouvrir la base de données
            const db = await openDatabase();

            // Supprimer le projet de la table Projet
            await db.run('DELETE FROM Acces WHERE ID_Acces = ?',[ID_Acces])
            

            // Fermer la base de données
            await db.close();

            return res.status(200).json({ message: 'Acces supprimé avec succès' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du projet' });
        }
    }

    return res.status(405).json({ message: 'Méthode non autorisée' }); 
}