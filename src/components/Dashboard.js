import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import StatCard from './StatCard';
import BottomNav from './BottomNav';
import { UserIcon, HomeIcon, CurrencyDollarIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

function Dashboard() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sair
          </button>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard 
                title="Total de Leads" 
                value="120" 
                icon={<UserIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />} 
              />
              <StatCard 
                title="Imóveis Disponíveis" 
                value="45" 
                icon={<HomeIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />} 
              />
              <StatCard 
                title="Vendas do Mês" 
                value="R$ 1.2M" 
                icon={<CurrencyDollarIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />} 
              />
              <StatCard 
                title="Tarefas Pendentes" 
                value="8" 
                icon={<ClipboardDocumentListIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />} 
              />
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

export default Dashboard;
