import React from 'react';

function ImovelCard({ imovel, abrirModalEdicao, handleDelete, formatarPreco }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h2 className="font-semibold">{imovel.endereco}</h2>
      <p className="text-sm text-gray-600">{imovel.tipo}</p>
      <p className="text-sm font-medium text-blue-600">{formatarPreco(imovel.preco)}</p>
      <p className="text-sm text-gray-600">{imovel.quartos} quartos • {imovel.area}m²</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {imovel.fotos && imovel.fotos.map((foto, index) => (
          <img key={index} src={foto} alt={`Foto ${index + 1}`} className="w-24 h-24 object-cover rounded" />
        ))}
      </div>
      <div className="mt-2 flex justify-between">
        <button 
          className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          onClick={() => abrirModalEdicao(imovel)}
        >
          Editar
        </button>
        <button 
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
          onClick={() => handleDelete(imovel.id, imovel.fotos)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

export default ImovelCard;
