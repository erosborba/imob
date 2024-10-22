import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import BottomNav from './BottomNav';

function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'tarefas'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tarefasArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTarefas(tarefasArray);
    });

    return () => unsubscribe();
  }, []);

  const adicionarTarefa = async (e) => {
    e.preventDefault();
    if (novaTarefa.trim() === '') return;
    await addDoc(collection(db, 'tarefas'), {
      texto: novaTarefa,
      concluida: false,
      timestamp: new Date()
    });
    setNovaTarefa('');
  };

  const toggleTarefa = async (id, concluida) => {
    await updateDoc(doc(db, 'tarefas', id), {
      concluida: !concluida
    });
  };

  const deletarTarefa = async (id) => {
    await deleteDoc(doc(db, 'tarefas', id));
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Tarefas</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <form onSubmit={adicionarTarefa} className="mb-4">
            <input
              type="text"
              value={novaTarefa}
              onChange={(e) => setNovaTarefa(e.target.value)}
              placeholder="Nova tarefa"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Adicionar Tarefa
            </button>
          </form>
          <ul className="divide-y divide-gray-200">
            {tarefas.map((tarefa) => (
              <li key={tarefa.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={tarefa.concluida}
                    onChange={() => toggleTarefa(tarefa.id, tarefa.concluida)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className={`ml-3 ${tarefa.concluida ? 'line-through text-gray-500' : ''}`}>
                    {tarefa.texto}
                  </span>
                </div>
                <button
                  onClick={() => deletarTarefa(tarefa.id)}
                  className="ml-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

export default Tarefas;
