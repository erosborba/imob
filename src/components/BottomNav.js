import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, UserIcon, ClipboardDocumentListIcon, UserCircleIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

function BottomNav() {
  return (
    <nav className="bg-white shadow fixed bottom-0 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <Link to="/dashboard" className="text-gray-500 hover:text-gray-900 py-4 px-3 text-center">
            <HomeIcon className="h-6 w-6 mx-auto" />
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/leads" className="text-gray-500 hover:text-gray-900 py-4 px-3 text-center">
            <UserIcon className="h-6 w-6 mx-auto" />
            <span className="text-xs">Leads</span>
          </Link>
          <Link to="/imoveis" className="text-gray-500 hover:text-gray-900 py-4 px-3 text-center">
            <BuildingOfficeIcon className="h-6 w-6 mx-auto" />
            <span className="text-xs">Imóveis</span>
          </Link>
          <Link to="/tarefas" className="text-gray-500 hover:text-gray-900 py-4 px-3 text-center">
            <ClipboardDocumentListIcon className="h-6 w-6 mx-auto" />
            <span className="text-xs">Tarefas</span>
          </Link>
          <Link to="/perfil" className="text-gray-500 hover:text-gray-900 py-4 px-3 text-center">
            <UserCircleIcon className="h-6 w-6 mx-auto" />
            <span className="text-xs">Perfil</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default BottomNav;
