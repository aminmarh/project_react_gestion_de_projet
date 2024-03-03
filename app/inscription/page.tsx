'use client';
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
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
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <TextField
                label="Prénom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            <TextField
                label="Nom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
            <TextField
                label="Mot de passe"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" color="primary">
                S'inscrire
            </Button>
        </form>
    );
};

export default RegisterPage;