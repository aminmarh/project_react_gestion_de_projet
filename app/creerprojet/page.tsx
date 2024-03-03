"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Navbar from '@/components/navbar';

const CreateProjectPage: React.FC = () => {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['ID_Employe']);
    const [userRole, setUserRole] = useState<number | null>(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await axios.get('/api/recoverRole?id_employe=' + cookies.ID_Employe);
                setUserRole(response.data.id_role);
            } catch (error) {
                console.error('Erreur lors de la récupération du rôle de l\'utilisateur', error);
            }
        };

        fetchUserRole();
    }, []);

    const handleCreateProject = async () => {
        try {
            const response = await axios.post('/api/createproject', {
                nom: projectName,
                description: projectDescription,
                idChefDeProjet: cookies.ID_Employe
            });

            if (response.status === 200) {
                // Le projet a été créé avec succès
                console.log('Projet créé avec succès!');
            } else {
                // Gérer les erreurs de création du projet
                console.error('Erreur lors de la création du projet');
            }
        } catch (error) {
            console.error('Erreur lors de la communication avec l\'API', error);
        }
    };

    return (
        <div>
            <Navbar />
            {userRole === 1 ? (
                <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                    <div className="mx-auto max-w-2xl">
                        <div className="text-center">
                            <h2 className="text-xl text-gray-800 font-bold sm:text-3xl dark:text-white">
                                Créer un projet
                            </h2>
                        </div>

                        <div className="mt-5 p-4 relative z-10 bg-white border rounded-xl sm:mt-10 md:p-10 dark:bg-gray-800 dark:border-gray-700">
                            <form>
                                <div className="mb-4 sm:mb-8">
                                    <label className="block mb-2 text-sm font-medium dark:text-white">Nom du projet</label>
                                    <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Nom du projet" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium dark:text-white">Description</label>
                                    <div className="mt-1">
                                        <textarea value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} rows="3" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Description..."></textarea>
                                    </div>
                                </div>

                                <div className="mt-6 grid">
                                    <button onClick={handleCreateProject} className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Créer</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                    <div className="mx-auto max-w-2xl">
                        <div className="text-center">
                            <h2 className="text-xl text-gray-800 font-bold sm:text-3xl dark:text-white">
                                Accès restreint
                            </h2>
                        </div>

                        <div className="mt-5 p-4 relative z-10 bg-white border rounded-xl sm:mt-10 md:p-10 dark:bg-gray-800 dark:border-gray-700">
                            <p className="text-center text-gray-800 dark:text-white">
                                Vous n'avez pas les droits nécessaires pour créer un projet.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateProjectPage;