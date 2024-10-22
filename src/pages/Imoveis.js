import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase';
import BottomNav from '../components/BottomNav';
import ImovelLista from '../components/imoveis/ImovelLista';
import ImovelFiltro from '../components/imoveis/ImovelFiltro';
import ImovelModal from '../components/imoveis/ImovelModal';

function Imoveis() {
  const [imoveis, setImoveis] = useState([]);
  const [editandoImovel, setEditandoImovel] = useState(null);
  const [busca, setBusca] = useState('');
  const [buscaAvancada, setBuscaAvancada] = useState(false);
  const [filtros, setFiltros] = useState({
    tipo: '',
    precoMin: 0,
    precoMax: 1000000,
    quartos: 0,
    areaMin: 0,
  });
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'imoveis'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const imoveisArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setImoveis(imoveisArray);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id, fotos) => {
    try {
      await deleteDoc(doc(db, 'imoveis', id));
      // Deletar as fotos do Storage
      for (const fotoUrl of fotos) {
        const fotoRef = ref(storage, fotoUrl);
        await deleteObject(fotoRef);
      }
      console.log('Imóvel e fotos deletados com sucesso');
    } catch (error) {
      console.error("Erro ao deletar imóvel:", error);
    }
  };

  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preco);
  };

  const abrirModalAdicao = () => {
    setEditandoImovel(null);
    setModalAberto(true);
  };

  const abrirModalEdicao = (imovel) => {
    setEditandoImovel(imovel);
    setModalAberto(true);
  };

  const onImovelAdded = () => {
    console.log("Imóvel adicionado, atualizando lista...");
    // Se necessário, você pode forçar uma nova consulta aqui
    // ou confiar no listener do onSnapshot para atualizar automaticamente
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Imóveis</h1>
        <button onClick={abrirModalAdicao} className="p-2 rounded-full hover:bg-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <ImovelFiltro 
        filtros={filtros}
        setFiltros={setFiltros}
        busca={busca}
        setBusca={setBusca}
        buscaAvancada={buscaAvancada}
        setBuscaAvancada={setBuscaAvancada}
      />

      <ImovelLista 
        imoveis={imoveis}
        filtros={filtros}
        busca={busca}
        abrirModalEdicao={abrirModalEdicao}
        handleDelete={handleDelete}
        formatarPreco={formatarPreco}
      />

      <ImovelModal 
        modalAberto={modalAberto}
        setModalAberto={setModalAberto}
        editandoImovel={editandoImovel}
        setEditandoImovel={setEditandoImovel}
        onImovelAdded={onImovelAdded}
      />

      <BottomNav />
    </div>
  );
}

export default Imoveis;
