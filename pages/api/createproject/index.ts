import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function createProject(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Ouvrir la connexion à la base de données SQLite
        const db = await open({
            filename: process.env.DB_PATH||'',
            driver: sqlite3.Database,
        });

        // Récupérer les données du corps de la requête
        const { nom, description, idChefDeProjet } = req.body;

        // Insérer le nouveau projet dans la table Projet
        const result = await db.run(
            'INSERT INTO Projet (Nom, Description, ID_ChefDeProjet) VALUES (?, ?, ?)',
            [nom, description, idChefDeProjet]
        );
        const result2 = await db.run(
            'INSERT INTO Acces (ID_Employe,ID_Projet,TypeAcces) VALUES (?, ?, ?)',
            [idChefDeProjet, result.lastID, 'lecture et écriture']
        );

        // Récupérer l'ID du projet nouvellement créé
        const projectId = result.lastID;


        // Fermer la connexion à la base de données SQLite
        await db.close();

        // Répondre avec l'ID du projet créé
        res.status(200).json({ projectId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création du projet.' });
    }
}