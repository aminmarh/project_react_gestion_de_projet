'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Navbar from "@/components/navbar";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, MenuItem, Select, SelectChangeEvent, Paper } from "@mui/material";

export default function Projet({ params: { id } }: { params: { id: string } }) {
  const [cookies, setCookie, removeCookie] = useCookies(['ID_Employe']);
  const [project, setProject] = useState<any>();
  const [tasks, setTasks] = useState<any[]>([]);

  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [effort, setEffort] = useState('');
  const [etat, setEtat] = useState('');
  const [typetache, setTypetache] = useState('');

  interface Task {
    ID_Tache: number;
    Titre: string;
    Description: string;
    Effort: number;
    Etat: string;
    ID_Projet: number;
    TypeTache: string;
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('../api/recoverProject?userId=' + cookies.ID_Employe + '&projectId=' + id)
      setProject(result.data[0]);
    }
    fetchData();
  }, []);

  const idProjet = id;
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('../api/task/createTask', {
        titre,
        description,
        effort,
        etat,
        idProjet,
        typetache
      });
      window.location.reload();

      // Handle success response
      console.log(response.data);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      const response = await axios.delete(`../api/task/deleteTask?id=${taskId}`);
      console.log(response.data);
      window.location.reload();
      
      const updatedTasks = tasks.filter((task) => task.ID_Tache !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  const [taches, setTaches] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTaches = async () => {
      try {
        const response = await axios.get('../api/task/putTask?id=' + idProjet);
        setTaches(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTaches();
  }, []);

  const tachesAFaire = taches.filter((tache) => tache.Etat === 'à faire');
  const tachesEnCours = taches.filter((tache) => tache.Etat === 'en cours');
  const tachesTerminees = taches.filter((tache) => tache.Etat === 'terminé');

  return (
    <div>
      <Navbar />
      <h1>{project && project.Nom}</h1>

      <TableContainer component={Paper}>
        <Table aria-label="tableau des tâches">
          <TableHead>
            <TableRow>
              <TableCell><strong>À faire</strong></TableCell>
              <TableCell><strong>En cours</strong></TableCell>
              <TableCell><strong>Terminé</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                {tachesAFaire.map((tache) => (
                  <div key={tache.ID_Tache}>
                    <h3>{tache.Titre}</h3>
                    <p>{tache.Description}</p>
                    <p>{tache.TypeTache}</p>
                    <p>{tache.Etat}</p>
                    <p>{tache.Effort}</p>
                    <Button onClick={() => handleDeleteTask(tache.ID_Tache)}>Delete</Button>
                  </div>
                ))}
              </TableCell>
              <TableCell>
                {tachesEnCours.map((tache) => (
                  <div key={tache.ID_Tache}>
                    <h3>{tache.Titre}</h3>
                    <p>{tache.Description}</p>
                    <p>{tache.TypeTache}</p>
                    <p>{tache.Etat}</p>
                    <p>{tache.Effort}</p>
                    <Button onClick={() => handleDeleteTask(tache.ID_Tache)}>Delete</Button>
                  </div>
                ))}
              </TableCell>
              <TableCell>
                {tachesTerminees.map((tache) => (
                  <div key={tache.ID_Tache}>
                    <h3>{tache.Titre}</h3>
                    <p>{tache.Description}</p>
                    <p>{tache.TypeTache}</p>
                    <p>{tache.Etat}</p>
                    <p>{tache.Effort}</p>
                    <Button onClick={() => handleDeleteTask(tache.ID_Tache)}>Delete</Button>
                  </div>
                ))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <br />
      <br />
      <h1>Create Ticket</h1>
      <form onSubmit={handleAddTask}>
        <div>
          <label htmlFor="titre">Titre:</label>
          <input
            type="text"
            id="titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="effort">Effort:</label>
          <select
            id="effort"
            value={effort}
            onChange={(e) => setEffort(e.target.value)}
          >
            <option value="">Select Effort</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="8">8</option>
            <option value="13">13</option>
            <option value="21">21</option>
            <option value="34">34</option>
            <option value="55">55</option>
            <option value="89">89</option>
          </select>
        </div>
        <div>
          <label htmlFor="etat">Etat:</label>
          <select
            id="etat"
            value={etat}
            onChange={(e) => setEtat(e.target.value)}
          >
            <option value="">Select Etat</option>
            <option value="à faire">à faire</option>
            <option value="en cours">en cours</option>
            <option value="terminé">terminé</option>
          </select>
        </div>
        <div>
          <label htmlFor="typetache">Type de tâche:</label>
          <select
            id="typeTache"
            value={typetache}
            onChange={(e) => setTypetache(e.target.value)}
          >
            <option value="">Select Type de tâche</option>
            <option value="technique">Technique</option>
            <option value="fonctionnalité">Fonctionnalité</option>
          </select>
        </div>
        <button type="submit">Create Ticket</button>
      </form>
      <br />
      <br />
    
    </div>
  )
}