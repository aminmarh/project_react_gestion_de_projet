import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            
            const db = await open({
                filename: process.env.DB_PATH|| '',
                driver: sqlite3.Database,
            });

            const { userId, projectId } = req.query;

            const project = await db.all(
                `SELECT Projet.* FROM Projet
                INNER JOIN Acces ON Projet.ID_Projet = Acces.ID_Projet
                WHERE Acces.ID_Employe = ? AND Projet.ID_Projet = ?`,
                [userId,projectId]
            );

            res.status(200).json(project);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
