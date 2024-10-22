import React, { useState, useEffect } from 'react';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';

function ImovelModal({ modalAberto, setModalAberto, editandoImovel, setEditandoImovel, onImovelAdded }) {
  const [novoImovel, setNovoImovel] = useState({
    titulo: '',
    tipo: '',
    endereco: '',
    preco: '',
    quartos: '',
    banheiros: '',
    area: '',
    descricao: '',
    fotos: []
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editandoImovel) {
      setNovoImovel(editandoImovel);
    } else {
      setNovoImovel({
        titulo: '',
        tipo: '',
        endereco: '',
        preco: '',
        quartos: '',
        banheiros: '',
        area: '',
        descricao: '',
        fotos: []
      });
    }
  }, [editandoImovel]);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);

    try {
      const uploadedUrls = await Promise.all(
        files.map(async (file) => {
          const fileRef = ref(storage, `imoveis/${Date.now()}_${file.name}`);
          await uploadBytes(fileRef, file);
          return getDownloadURL(fileRef);
        })
      );

      setNovoImovel(prev => ({
        ...prev,
        fotos: [...prev.fotos, ...uploadedUrls]
      }));
    } catch (error) {
      console.error("Erro ao fazer upload das imagens:", error);
    }

    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoImovel) {
        const imovelRef = doc(db, 'imoveis', editandoImovel.id);
        await updateDoc(imovelRef, novoImovel);
        console.log('Imóvel atualizado com sucesso');
      } else {
        const docRef = await addDoc(collection(db, 'imoveis'), novoImovel);
        console.log('Novo imóvel adicionado com sucesso', docRef.id);
        if (onImovelAdded) onImovelAdded();
      }
      setModalAberto(false);
      setEditandoImovel(null);
      setNovoImovel({
        titulo: '',
        tipo: '',
        endereco: '',
        preco: '',
        quartos: '',
        banheiros: '',
        area: '',
        descricao: '',
        fotos: []
      });
    } catch (error) {
      console.error("Erro ao salvar imóvel:", error);
    }
  };

  if (!modalAberto) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">{editandoImovel ? 'Editar Imóvel' : 'Adicionar Imóvel'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Título"
            value={novoImovel.titulo}
            onChange={(e) => setNovoImovel({...novoImovel, titulo: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <select
            value={novoImovel.tipo}
            onChange={(e) => setNovoImovel({...novoImovel, tipo: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Selecione o tipo</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Casa">Casa</option>
            <option value="Terreno">Terreno</option>
          </select>
          <input
            type="text"
            placeholder="Endereço"
            value={novoImovel.endereco}
            onChange={(e) => setNovoImovel({...novoImovel, endereco: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="number"
            placeholder="Preço"
            value={novoImovel.preco}
            onChange={(e) => setNovoImovel({...novoImovel, preco: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="number"
            placeholder="Quartos"
            value={novoImovel.quartos}
            onChange={(e) => setNovoImovel({...novoImovel, quartos: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="number"
            placeholder="Banheiros"
            value={novoImovel.banheiros}
            onChange={(e) => setNovoImovel({...novoImovel, banheiros: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="number"
            placeholder="Área (m²)"
            value={novoImovel.area}
            onChange={(e) => setNovoImovel({...novoImovel, area: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <textarea
            placeholder="Descrição"
            value={novoImovel.descricao}
            onChange={(e) => setNovoImovel({...novoImovel, descricao: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="3"
          ></textarea>
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="w-full p-2 border border-gray-300 rounded-md"
            disabled={uploading}
          />
          {uploading && <p>Fazendo upload das imagens...</p>}
          <div className="flex justify-end space-x-2 pt-4">
            <button 
              type="button" 
              onClick={() => setModalAberto(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={uploading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {editandoImovel ? 'Atualizar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ImovelModal;
