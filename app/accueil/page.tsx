'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Button, TextField } from '@mui/material';
import Link from 'next/link';
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
            // Refresh the project list after deletion
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
            // Refresh the project list after editing
            const result = await axios.get('api/recoverProjects?userId=' + cookies.ID_Employe)
            setProjects(result.data);
            setEditingProject(null);
        } catch (error) {
            console.error('Error editing project:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <Typography variant="h5" gutterBottom>
                Liste des projets
            </Typography>
            <Paper elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Project Name</TableCell>
                            <TableCell>Project Description</TableCell>
                            <TableCell>Actions</TableCell> 
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map((project: { Nom: string, Description: string, ID_Projet: string }, index: number) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {editingProject === project.ID_Projet ? (
                                        <TextField
                                            value={project.Nom}
                                            onChange={(e) => {
                                                const updatedProjects = [...projects];
                                                updatedProjects[index].Nom = e.target.value;
                                                setProjects(updatedProjects);
                                            }}
                                        />
                                    ) : (
                                        <Link href={`/projet/${project.ID_Projet}`}>
                                            {project.Nom}
                                        </Link>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingProject === project.ID_Projet ? (
                                        <TextField
                                            value={project.Description}
                                            onChange={(e) => {
                                                const updatedProjects = [...projects];
                                                updatedProjects[index].Description = e.target.value;
                                                setProjects(updatedProjects);
                                            }}
                                        />
                                    ) : (
                                        project.Description
                                    )}
                                </TableCell>
                                <TableCell>
                                {editingProject === project.ID_Projet ? (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleEditProject(project.ID_Projet, project.Nom, project.Description)}
                                        >
                                            Save
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => setEditingProject(project.ID_Projet)}
                                        >
                                            Edit
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDeleteProject(project.ID_Projet)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
};

export default Accueil;
