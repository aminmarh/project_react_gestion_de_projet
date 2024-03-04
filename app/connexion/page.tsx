'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie';

const LoginPage = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['ID_Employe']);
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/connect', {
                email,
                password
            });
            setCookie('ID_Employe', response.data.ID_Employe, { path: '/' });
            router.push('/accueil');
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-6">Page de connexion</h1>
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
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    required
                />
                <button
                    onClick={handleLogin}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Se connecter
                </button>
                <button
                    onClick={() => router.push('/inscription')}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                    S'inscrire
                </button>
            </div>
        </div>
    );
};

export default LoginPage;