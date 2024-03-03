import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';



const dbPath = process.env.DB_PATH||'';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });

        const chefDeProjetId = req.query.chefDeProjetId;

        const projects = await db.all(
            'SELECT * FROM Projet WHERE ID_ChefDeProjet = ?',
            chefDeProjetId
        );

        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}