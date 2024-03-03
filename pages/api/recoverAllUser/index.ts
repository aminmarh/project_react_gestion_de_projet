import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const dbPath = process.env.DB_PATH||'';
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });

        const users = await db.all('SELECT * FROM Employe');
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}