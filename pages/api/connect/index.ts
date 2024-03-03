import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Chemin vers la base de données SQLite
const dbPath = process.env.DB_PATH|| '';

// Fonction pour ouvrir la base de données
async function openDatabase() {
    return open({
        filename: dbPath,
        driver: sqlite3.Database,
    });
}

// API handler pour la connexion
export default async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Vérifier les informations de connexion dans la base de données
        const db = await openDatabase();
        const user = await db.get('SELECT * FROM Employe WHERE Mail = ? AND MotDePasse = ?', [email, password]);

        if (user) {
            // Utilisateur trouvé, retourner une réponse réussie
            res.status(200).json({ ID_Employe: user.ID_Employe});
        } else {
            // Utilisateur non trouvé, retourner une réponse d'erreur
            res.status(401).json({ message: 'Identifiants invalides' });
        }
    } else {
        // Méthode HTTP non autorisée
        res.status(405).json({ message: 'Méthode non autorisée' });
    }
}