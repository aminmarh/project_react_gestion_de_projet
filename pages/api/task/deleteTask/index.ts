import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Chemin de la base de données
const dbPath = process.env.DB_PATH||'';

export default async function deleteTaskHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    try {
        // Ouvrir la connexion à la base de données
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });

        // Supprimer la tâche en fonction de l'ID
        const { id } = req.query;
        await db.run('DELETE FROM Tache WHERE ID_Tache = ?', id);

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}