import React, { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import BottomNav from './BottomNav';

function PerfilCorretor() {
  const [perfil, setPerfil] = useState({
    nome: '',
    email: '',
    telefone: '',
    creci: '',
    bio: '',
    especialidades: ''
  });
  const [editando, setEditando] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const carregarPerfil = async () => {
      if (user) {
        const docRef = doc(db, 'corretores', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPerfil({ ...docSnap.data(), email: user.email });
        } else {
          setPerfil({ ...perfil, nome: user.displayName, email: user.email });
        }
      }
    };

    carregarPerfil();
  }, [user]);

  const handleChange = (e) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');

    try {
      // Atualizar o perfil no Authentication
      await updateProfile(user, { displayName: perfil.nome });

      // Atualizar ou criar o documento do corretor no Firestore
      await setDoc(doc(db, 'corretores', user.uid), {
        nome: perfil.nome,
        telefone: perfil.telefone,
        creci: perfil.creci,
        bio: perfil.bio,
        especialidades: perfil.especialidades
      });

      setEditando(false);
      setMensagem('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      setMensagem('Erro ao atualizar perfil. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Perfil do Corretor</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {mensagem && (
            <div className="mb-4 p-4 text-sm text-green-700 bg-green-100 rounded-lg">
              {mensagem}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                name="nome"
                id="nome"
                value={perfil.nome}
                onChange={handleChange}
                disabled={!editando}
                className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={perfil.email}
                disabled
                className="mt-1 block w-full shadow-sm sm:text-sm rounded-md bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">Telefone</label>
              <input
                type="tel"
                name="telefone"
                id="telefone"
                value={perfil.telefone}
                onChange={handleChange}
                disabled={!editando}
                className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
              />
            </div>
            <div>
              <label htmlFor="creci" className="block text-sm font-medium text-gray-700">CRECI</label>
              <input
                type="text"
                name="creci"
                id="creci"
                value={perfil.creci}
                onChange={handleChange}
                disabled={!editando}
                className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
              />
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Biografia</label>
              <textarea
                name="bio"
                id="bio"
                rows="3"
                value={perfil.bio}
                onChange={handleChange}
                disabled={!editando}
                className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
              ></textarea>
            </div>
            <div>
              <label htmlFor="especialidades" className="block text-sm font-medium text-gray-700">Especialidades</label>
              <input
                type="text"
                name="especialidades"
                id="especialidades"
                value={perfil.especialidades}
                onChange={handleChange}
                disabled={!editando}
                className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
              />
            </div>
            {editando ? (
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditando(false)}
                  className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Salvar
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setEditando(true)}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Editar Perfil
              </button>
            )}
          </form>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

export default PerfilCorretor;
