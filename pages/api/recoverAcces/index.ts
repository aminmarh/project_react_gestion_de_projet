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

            const {ID_ChefDeProjet} = req.query;

            const acces = await db.all(
                `SELECT Acces.ID_Acces, PROJET.Nom as NomProjet, Employe.Nom as NomEmploye, Employe.Prenom, Acces.TypeAcces from Acces Inner join Projet 
                on ACCES.ID_Projet= Projet.ID_Projet
                INNER JOIN Employe
                on ACCES.ID_Employe = Employe.ID_Employe
                where projet.ID_ChefDeProjet=? and Projet.ID_ChefDeProjet <> Employe.ID_Employe
                `,
                [ID_ChefDeProjet]
            );

            res.status(200).json(acces);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
