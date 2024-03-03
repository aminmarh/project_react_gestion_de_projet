import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Fonction pour ouvrir la base de données SQLite
async function openDB() {
    return open({
        filename: process.env.DB_PATH||'',
        driver: sqlite3.Database,
    });
}

// API handler pour créer un ticket
export default async function createTicketHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    try {
        const { titre, description, effort, etat, idProjet, typetache } = req.body;

        // Ouvrir la base de données
        const db = await openDB();

        // Insérer le ticket dans la table Tache
        const result = await db.run(
            'INSERT INTO Tache (Titre, Description, Effort, Etat, ID_Projet, TypeTache) VALUES (?, ?, ?, ?, ?, ?)',
            [titre, description, effort, etat, idProjet, typetache]
        );
        // Récupérer l'ID du ticket créé
        const ticketId = result.lastID;

        res.status(200).json({ message: 'Ticket créé avec succès', ticketId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création du ticket' });
    }
}