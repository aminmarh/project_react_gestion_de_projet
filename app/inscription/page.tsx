'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const RegisterPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post('/api/register', {
            email,
            firstName,
            lastName,
            password,
        }).then(() => {
            alert('Inscription réussie !');
            router.push('/connexion');
        }).catch((err) => {
            alert('Erreur lors de l\'inscription');
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-6">Page d'inscription</h1>
            <div className="flex flex-col space-y-4">
                <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md"
                        required
                />
                <input
                    type="text"
                    placeholder="Prénom"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    required
                />
                <input
                    type="text"
                    placeholder="Nom"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <button
                type="submit"
                className="px-4 py-2 my-4 bg-blue-500 text-white rounded-md"
            >
                S'inscrire
            </button>
            <button type='button'
            onClick={() => router.push('/connexion')}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
                Se connecter
            </button>
        </form>

    );
};

export default RegisterPage;