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
            console.log(response.data);
        } catch (error) {
            // Gérez les erreurs ici
            console.error(error);
        }
    };

    return (
        <div>
            
            <h1>Page de connexion</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Se connecter</button>
        </div>
    );
};

export default LoginPage;