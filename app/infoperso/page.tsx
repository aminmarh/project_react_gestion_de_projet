'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/navbar';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

const InformationPage = () => {
    const [data, setData] = useState();
    const [cookies, setCookie, removeCookie] = useCookies(['ID_Employe']);
    const router = useRouter();

    if (cookies.ID_Employe === undefined){
        router.push("/");
    };

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
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h1 className="text-2xl font-bold mb-4">Mes informations personnelles</h1>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr>
                                        <th className="border-b-2 border-gray-300 px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                        <th className="border-b-2 border-gray-300 px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Nom</th>
                                        <th className="border-b-2 border-gray-300 px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Prénom</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {data && (
                                        <tr>
                                            <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-500 text-center">{(data as { Mail: string }).Mail}</td>
                                            <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-500 text-center">{(data as { Nom: string }).Nom}</td>
                                            <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-500 text-center">{(data as { Prenom: string }).Prenom}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InformationPage;