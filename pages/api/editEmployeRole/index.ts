import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Chemin de la base de données
const dbPath = process.env.DB_PATH;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        try {
            // Ouvrir la connexion à la base de données
            const db = await open({
                filename: dbPath||'',
                driver: sqlite3.Database,
            });

            const {ID_Role, ID_Employe } = req.body;
            
            

            await db.run('UPDATE Employe SET ID_Role= ? WHERE ID_Employe= ?', [ID_Role, ID_Employe]);

          
            await db.close();

            res.status(200).json({ message: 'Role mis à jour avec succès' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du role' });
        }
    } else {
        res.status(405).json({ message: 'Méthode non autorisée' });
    }
}