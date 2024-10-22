import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import BottomNav from './BottomNav';

function Leads() {
  const [leads, setLeads] = useState([]);
  const [novoLead, setNovoLead] = useState({ nome: '', email: '', telefone: '', interesse: '' });
  const [editandoLead, setEditandoLead] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'leads'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const leadsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLeads(leadsArray);
    });

    return () => unsubscribe();
  }, []);

  const adicionarLead = async (e) => {
    e.preventDefault();
    if (novoLead.nome.trim() === '' || novoLead.email.trim() === '') return;
    await addDoc(collection(db, 'leads'), {
      ...novoLead,
      timestamp: new Date()
    });
    setNovoLead({ nome: '', email: '', telefone: '', interesse: '' });
  };

  const iniciarEdicao = (lead) => {
    setEditandoLead(lead);
    setNovoLead(lead);
  };

  const cancelarEdicao = () => {
    setEditandoLead(null);
    setNovoLead({ nome: '', email: '', telefone: '', interesse: '' });
  };

  const salvarEdicao = async () => {
    await updateDoc(doc(db, 'leads', editandoLead.id), novoLead);
    setEditandoLead(null);
    setNovoLead({ nome: '', email: '', telefone: '', interesse: '' });
  };

  const deletarLead = async (id) => {
    await deleteDoc(doc(db, 'leads', id));
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <form onSubmit={editandoLead ? salvarEdicao : adicionarLead} className="mb-4 space-y-4">
            <input
              type="text"
              value={novoLead.nome}
              onChange={(e) => setNovoLead({...novoLead, nome: e.target.value})}
              placeholder="Nome"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
            <input
              type="email"
              value={novoLead.email}
              onChange={(e) => setNovoLead({...novoLead, email: e.target.value})}
              placeholder="Email"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
            <input
              type="tel"
              value={novoLead.telefone}
              onChange={(e) => setNovoLead({...novoLead, telefone: e.target.value})}
              placeholder="Telefone"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={novoLead.interesse}
              onChange={(e) => setNovoLead({...novoLead, interesse: e.target.value})}
              placeholder="Interesse"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {editandoLead ? 'Salvar Edição' : 'Adicionar Lead'}
            </button>
            {editandoLead && (
              <button
                type="button"
                onClick={cancelarEdicao}
                className="ml-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancelar
              </button>
            )}
          </form>
          <ul className="divide-y divide-gray-200">
            {leads.map((lead) => (
              <li key={lead.id} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{lead.nome}</p>
                  <p className="text-sm text-gray-500">{lead.email}</p>
                  <p className="text-sm text-gray-500">{lead.telefone}</p>
                  <p className="text-sm text-gray-500">{lead.interesse}</p>
                </div>
                <div className="mt-2 sm:mt-0 space-x-2">
                  <button
                    onClick={() => iniciarEdicao(lead)}
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deletarLead(lead.id)}
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

export default Leads;
