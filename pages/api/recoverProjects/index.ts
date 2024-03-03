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

            const { userId } = req.query;

            const projects = await db.all(
                `SELECT Projet.* FROM Projet
                INNER JOIN Acces ON Projet.ID_Projet = Acces.ID_Projet
                WHERE Acces.ID_Employe = ?`,
                userId
            );

            res.status(200).json(projects);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
