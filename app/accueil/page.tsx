'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Accueil = () => {
    const [cookies] = useCookies(['ID_Employe']);
    const [projects, setProjects] = useState([]);
    const [editingProject, setEditingProject] = useState<string | null>(null);
    const router = useRouter();

    if (cookies.ID_Employe === undefined){
        router.push("/");
    };

    useEffect(() => {
        const fetchData = async () => { 
            const result = await axios.get('api/recoverProjects?userId=' + cookies.ID_Employe)
            setProjects(result.data);

        }
        fetchData();
    }, []);

    const handleDeleteProject = async (projectId: string) => {
        try {
            await axios.delete(`/api/deleteProject?projectId=${projectId}`);
            const result = await axios.get('api/recoverProjects?userId=' + cookies.ID_Employe)
            setProjects(result.data);
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const handleEditProject = async (projectId: string, newName: string, newDescription: string) => {
        try {
            await axios.post('/api/editproject', {
                id: projectId,
                nom: newName,
                description: newDescription
            });
            const result = await axios.get('api/recoverProjects?userId=' + cookies.ID_Employe)
            setProjects(result.data);
            setEditingProject(null);
        } catch (error) {
            console.error('Error editing project:', error);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto py-6">
                <h5 className="text-xl font-semibold mb-4 text-center">Liste des projets</h5>
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nom du projet
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {projects.map((project, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            {editingProject === project.ID_Projet ? (
                                            <input
                                                type="text"
                                                value={project.Nom}
                                                onChange={(e) => {
                                                const updatedProjects = [...projects];
                                                updatedProjects[index].Nom = e.target.value;
                                                setProjects(updatedProjects);
                                                
                                                }}
                                                className="input input-bordered w-full"
                                            />
                                            ) : (
                                            <a href={`/projet/${project.ID_Projet}`} className="text-indigo-600 hover:text-indigo-900">{project.Nom}</a>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            {editingProject === project.ID_Projet ? (
                                            <input
                                                type="text"
                                                value={project.Description}
                                                onChange={(e) => {
                                                const updatedProjects = [...projects];
                                                updatedProjects[index].Description = e.target.value;
                                                setProjects(updatedProjects);
                                                }}
                                                className="input input-bordered w-full"
                                            />
                                            ) : (
                                            project.Description
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                            {cookies.ID_Employe === project.ID_ChefDeProjet && (
                                            <>
                                                {editingProject === project.ID_Projet ? (
                                                <button
                                                    onClick={() => handleEditProject(project.ID_Projet, project.Nom, project.Description)}
                                                    className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                                                >
                                                    Save
                                                </button>
                                                ) : (
                                                <button
                                                    onClick={() => setEditingProject(project.ID_Projet)}
                                                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                                                >
                                                    Edit
                                                </button>
                                                )}
                                                <button
                                                onClick={() => handleDeleteProject(project.ID_Projet)}
                                                className="bg-red-500 text-white px-4 py-2 rounded-md"
                                                >
                                                Delete
                                                </button>
                                            </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            </div>
        </div>

    );
};

export default Accueil;
