'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Navbar from "@/components/navbar";
import { useRouter } from 'next/navigation';

export default function Projet({ params: { id } }: { params: { id: string } }) {
  const [cookies] = useCookies(['ID_Employe']);
  const [Projet, setProjet] = useState<any>();
  const [taches, setTaches] = useState<any[]>([]);

  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [effort, setEffort] = useState('');
  const [etat, setEtat] = useState('');
  const [typetache, setTypetache] = useState('');
  const router = useRouter();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [role, setRole] = useState('');

  interface Task {
    ID_Tache: number;
    Titre: string;
    Description: string;
    Effort: number;
    Etat: string;
    ID_Projet: number;
    TypeTache: string;
  }

  if (cookies.ID_Employe === undefined){
    router.push("/");
  };

  useEffect(() => {
    const fetchRole = async () => {
      const result = await axios.get('../api/recoverRoleProjet?id_employe=' + cookies.ID_Employe + '&id_project=' + id)
      console.log(result.data.TypeAcces);
      setRole(result.data.TypeAcces);
      } 
      fetchRole();
  }, []);
      
  function checkRole() {
    if (role === "lecture seule") {
      return false;
    } else if (role === "lecture et écriture") {
      return true;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('../api/recoverProject?userId=' + cookies.ID_Employe + '&projectId=' + id)
      setProjet(result.data[0]);
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
      alert('Tâche ajoutée avec succès');
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      try {
        const response = await axios.put('../api/task/editTask', {
          id: editingTask.ID_Tache,
          titre: titre,
          description: description,
          effort: effort,
          etat: etat,
          idProjet : editingTask.ID_Projet,
          typetache,
        });
        window.location.reload();
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      const response = await axios.delete(`../api/task/deleteTask?id=${taskId}`);
      console.log(response.data);
      window.location.reload();
      
      const updatedTasks = taches.filter((task) => task.ID_Tache !== taskId);
      setTaches(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  };

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

  useEffect(() => {
    if (editingTask) {
      setTitre(editingTask.Titre);
      setDescription(editingTask.Description);
      setEffort(editingTask.Effort.toString());
      setEtat(editingTask.Etat);
      setTypetache(editingTask.TypeTache);
    }
  }, [editingTask]);

  return (
    <div className="bg-gray-100">
      <Navbar />
      <h1 className="text-3xl font-bold text-center mt-8">{Projet?.Nom}</h1>
      {checkRole() ? (
        <form onSubmit={editingTask ? handleEditTask : handleAddTask} className="flex flex-col items-center mt-8">
          <input
            type="text"
            placeholder="Titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-80"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-80"
          />
          <select
            value={etat}
            onChange={(e) => setEtat(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-80"
          >
            <option value="">Etat</option>
            <option value="à faire">A faire</option>
            <option value="en cours">En cours</option>
            <option value="terminé">Terminé</option>
          </select>
          <select
            value={typetache}
            onChange={(e) => setTypetache(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-80"
          >
            <option value="">Type de tâche</option>
            <option value="technique">Technique</option>
            <option value="fonctionnalité">Fonctionnalité</option>
          </select>
          <select
            value={effort}
            onChange={(e) => setEffort(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-80"
          >
            <option value="">Effort</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="8">8</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            {editingTask ? "Modifier la tâche" : "Ajouter une tâche"}
          </button>
        </form>
      ) : null}
      <div className="flex justify-center">
        <div className="w-full mt-8">
          <table className="w-full table-fixed">
            <thead>
              <tr>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Titre</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Description</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Effort</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">État</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Type de tâche</th>
                {checkRole() ? (<th className="border-b border-gray-300 px-4 py-2 text-center">Actions</th>) : null}
              </tr>
            </thead>
            <tbody>
              {taches.map((tache: Task) => (
                <tr key={tache.ID_Tache}>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{tache.Titre}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{tache.Description}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{tache.Effort}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{tache.Etat}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{tache.TypeTache}</td>
                  {checkRole() ? (
                    <td className="border-b border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => setEditingTask(tache)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDeleteTask(tache.ID_Tache)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Supprimer
                      </button>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}