"use client";
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Navbar from '@/components/navbar';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AddUser = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['ID_Employe']);
    const [employees, setEmployees] = useState([]);
    const [projets, setProjets] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedProjets, setSelectedProjets] = useState('');
    const [acces, setAcces] = useState('');
    const [userRole, setUserRole] = useState<number | null>(null);
    const router = useRouter();
    const [listeAcces, setListeAcces] = useState([]);

    if (cookies.ID_Employe === undefined){
        router.push("/");
    };

    const handleAddUser = async () => {
        try {
            const response = await axios.post('/api/addUserInProject', {
                employeeId: selectedEmployee,
                projectId: selectedProjets, 
                acces: acces
            });
            alert('Utilisateur ajouté avec succès');
            window.location.reload();
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

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

    useEffect(() => {
        const fetchProjets = async () => {
            var response = await axios.get('/api/recoverProjectChefProjet?chefDeProjetId=' + cookies.ID_Employe)
            setProjets(response.data);
            if (response.data.length != 0) {
                setSelectedProjets(response.data[0].ID_Projet);
            }
            
            response = await axios.get('/api/recoverAllUser')
            setEmployees(response.data.filter(employee => employee.ID_Employe !== cookies.ID_Employe));
            if (response.data.length > 0) {
                setSelectedEmployee(response.data[0].ID_Employe);
            }
        };
        fetchProjets();
    }, []);

    const handleProjectChange = (event) => {
        setSelectedProjets(event.target.value);
    };

    const handleEmployeeChange = (event) => {
        setSelectedEmployee(event.target.value);
    
    }

    useEffect(() => {
        const fetchAcces = async () => {
            try {
                const response = await axios.get('api/recoverAcces?ID_ChefDeProjet=' + cookies.ID_Employe);
                setListeAcces(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAcces();
    }, []);
    
    const handleModify = async (typeacces, ID_Acces) => {
        try {
            console.log(typeacces);
            const response = await axios.put('/api/editAccess', {
                typeacces: typeacces,
                ID_Acces: ID_Acces
            });
            alert('Acces modify successfully');
            window.location.reload();
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (accessId) => {
        try {
            const response = await axios.delete('/api/deleteAccess?ID_Acces='+accessId);
            alert('User deleted successfully');
            window.location.reload();
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Navbar />
            {userRole === 1 ? (
                <div className="container mx-auto px-4 py-10">
                    <h1 className="text-3xl font-bold mb-4">Ajouter un utilisateur</h1>
                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2">Utilisateur</h2>
                        <select
                            value={selectedEmployee}
                            onChange={handleEmployeeChange}
                            className="border border-gray-300 rounded-md px-3 py-2"
                        >
                            {employees.map(employee => (
                                <option key={employee.ID_Employe} value={employee.ID_Employe}>
                                    {employee.Prenom} {employee.Nom}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2">Projet</h2>
                        <select
                            value={selectedProjets}
                            onChange={handleProjectChange}
                            className="border border-gray-300 rounded-md px-3 py-2"
                        >
                            {projets.map(projet => (
                                <option key={projet.ID_Projet} value={projet.ID_Projet}>
                                    {projet.Nom} - {projet.Description}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="acces" className="block font-bold mb-2">Accès:</label>
                        <select
                            id="acces"
                            value={acces}
                            onChange={(e) => setAcces(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2"
                        >
                            <option value="">Accès</option>
                            <option value="lecture seule">Lecture seule</option>
                            <option value="lecture et écriture">Lecture et écriture</option>
                        </select>
                    </div>

                    <button
                        onClick={handleAddUser}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        disabled={!selectedEmployee || !selectedProjets || !acces}
                    >
                        Ajouter
                    </button>
                    <br />
                    <br />
                    <h2>Liste des accès:</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Projet
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Employé
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Prénom
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Accès
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {listeAcces.map(acces => (
                                <tr key={acces.ID_Acces}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {acces.NomProjet}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {acces.NomEmploye}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {acces.Prenom}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {acces.TypeAcces}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button 
                                        onClick={() => handleModify(acces.TypeAcces, acces.ID_Acces)}
                                        className="text-blue-500 hover:text-blue-700 mr-2">Modifier</button>
                                        <button
                                            onClick={() => handleDelete(acces.ID_Acces)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                                Vous n'avez pas les droits nécessaires pour modifier un projet.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default AddUser;