import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Chemin de la base de données SQLite
const DB_PATH = process.env.DB_PATH || '';

// Fonction pour ouvrir la base de données
async function openDatabase() {
    return open({
        filename: DB_PATH,
        driver: sqlite3.Database,
    });
}

// API handler pour la requête POST d'inscription
export default async function signupHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        console.log(DB_PATH)
        const { firstName, lastName, email, password } = req.body;

        // Vérifier si les données d'inscription sont valides
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'Veuillez fournir tous les champs requis' });
        }

        try {
            // Ouvrir la base de données
            const db = await openDatabase();

            // Insérer l'employé dans la table Employe
            await db.run(
                'INSERT INTO Employe (Prenom, Nom, Mail, MotDePasse,ID_Role) VALUES (?, ?, ?, ?,?)',
                firstName,
                lastName,
                email,
                password,
                2,

            );

            // Fermer la base de données
            await db.close();

            return res.status(200).json({ message: 'Inscription réussie' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Une erreur est survenue lors de l\'inscription' });
        }
    }

    return res.status(405).json({ message: 'Méthode non autorisée' });
}
