import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Chemin de la base de données
const dbPath = process.env.DB_PATH||'';

// Fonction pour ouvrir la base de données
async function openDB() {
    return open({
        filename: dbPath,
        driver: sqlite3.Database,
    });
}

// API endpoint pour ajouter un employé à un projet
export default async function addEmployeeToProject(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    try {
        const { employeeId, projectId, acces } = req.body;

        // Ouvrir la base de données
        const db = await openDB();

        // Vérifier si l'employé et le projet existent
        const employee = await db.get(
            'SELECT * FROM Employe WHERE ID_Employe = ?',
            employeeId
        );
        const project = await db.get(
            'SELECT * FROM Projet WHERE ID_Projet = ?',
            projectId
        );

        if (!employee || !project) {
            res.status(404).json({ message: 'Employee or project not found' });
            return;
        }

        // Vérifier si le couple IDEmploye et IDProjet existe déjà dans la table Acces
        const existingAccess = await db.get(
            'SELECT * FROM Acces WHERE ID_Employe = ? AND ID_Projet = ?',
            employeeId,
            projectId,
        );

        if (existingAccess) {
            res.status(409).json({ message: 'Access already exists' });
            return;
        }

        // Ajouter l'accès de l'employé au projet
        await db.run(
            'INSERT INTO Acces (ID_Employe, ID_Projet, TypeAcces) VALUES (?, ?, ?)',
            employeeId,
            projectId,
            acces
        );

        res.status(200).json({ message: 'Employee added to project' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}