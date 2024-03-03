"use client";
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Navbar from '@/components/navbar';
import axios from 'axios';

const AddUser = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['ID_Employe']);
    const [employees, setEmployees] = useState([]);
    const [projets, setProjets] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedProjets, setSelectedProjets] = useState('');
    const [acces, setAcces] = useState('');
    const [userRole, setUserRole] = useState<number | null>(null);



    const handleAddUser = async () => {
        try {
            const response = await axios.post('/api/addUserInProject', {
                employeeId: selectedEmployee,
                projectId: selectedProjets, 
                acces: acces
            });
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
            setSelectedEmployee(response.data[0].ID_Employe);
        };
        fetchProjets();
    }, []);

    const handleProjectChange = (event) => {
        setSelectedProjets(event.target.value);
    };

    const handleEmployeeChange = (event) => {
        setSelectedEmployee(event.target.value);
    
    }   
    
    return (
        <div>
            <Navbar />
            {userRole === 1 ? (
                <div>
                    <h1>Ajouter un utilisateur</h1>
                    <h2>Utilisateur</h2>
                    <select value={selectedEmployee} onChange={handleEmployeeChange}>
                        {employees.map(employee => (
                            <option key={employee.ID_Employe} value={employee.ID_Employe}>
                                {employee.Prenom} {employee.Nom}
                            </option>
                        ))}
                    </select>


                    <h2>Projet</h2>
                    <select value={selectedProjets} onChange={handleProjectChange}>
                        {projets.map(projet => (
                            <option key={projet.ID_Projet} value={projet.ID_Projet}>
                                {projet.Nom} - {projet.Description}
                            </option>
                        ))}
                    </select>

                    <div>
                        <label htmlFor="acces">Accès:</label>
                        <select
                            id="acces"
                            value={acces}
                            onChange={(e) => setAcces(e.target.value)}
                        >
                            <option value="">Select Acces</option>
                            <option value="lecture seule">lecture seule</option>
                            <option value="lecture et écriture">lecture et écriture</option>
                        </select>
                    </div>

                    <button onClick={handleAddUser}>Ajouter</button>
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