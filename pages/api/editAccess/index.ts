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

            const {typeacces, ID_Acces } = req.body;
            var newAccess = '';
            if (typeacces =='lecture seule'){
                newAccess = 'lecture et écriture';
            }
            else if(typeacces =='lecture et écriture'){
                newAccess = 'lecture seule';
            }
            

            await db.run('UPDATE Acces SET TypeAcces =? WHERE ID_Acces = ?', [newAccess, ID_Acces]);

          
            await db.close();

            res.status(200).json({ message: 'Acces mis à jour avec succès' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de l acces' });
        }
    } else {
        res.status(405).json({ message: 'Méthode non autorisée' });
    }
}