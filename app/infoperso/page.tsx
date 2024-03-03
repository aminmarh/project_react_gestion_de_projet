'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/navbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useCookies } from 'react-cookie';

const InformationPage = () => {
    const [data, setData] = useState();
    const [cookies, setCookie, removeCookie] = useCookies(['ID_Employe']);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('api/recoverInfo?id=' + cookies.ID_Employe);
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Navbar />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>Nom</TableCell>
                            <TableCell>Prénom</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && (
                            <TableRow>
                                <TableCell>{(data as { Mail: string }).Mail}</TableCell>
                                <TableCell>{(data as { Nom: string }).Nom}</TableCell>
                                <TableCell>{(data as { Prenom: string }).Prenom}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default InformationPage;