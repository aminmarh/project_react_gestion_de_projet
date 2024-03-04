'use client';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenue!</h1>
        <p className="text-lg mb-8">Que souhaitez-vous faire ?</p>
        <div className="space-x-4">
          <a href="/connexion">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Se connecter
            </button>
          </a>
          <a href="/inscription">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              S'inscrire  
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}