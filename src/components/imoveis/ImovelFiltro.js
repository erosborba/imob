import React from 'react';

function ImovelFiltro({ filtros, setFiltros, busca, setBusca, buscaAvancada, setBuscaAvancada }) {
  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preco);
  };

  return (
    <div className="p-4 space-y-2">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar imóveis"
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <button 
        className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={() => setBuscaAvancada(!buscaAvancada)}
      >
        Busca Avançada
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 inline-block ml-2 transform ${buscaAvancada ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      
      {buscaAvancada && (
        <div className="bg-white rounded-lg p-4 space-y-4 shadow-sm">
          <select
            value={filtros.tipo}
            onChange={(e) => setFiltros({...filtros, tipo: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Todos os tipos</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Casa">Casa</option>
            <option value="Terreno">Terreno</option>
          </select>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Preço: {formatarPreco(filtros.precoMin)} - {formatarPreco(filtros.precoMax)}</label>
            <input
              type="range"
              min="0"
              max="1000000"
              step="50000"
              value={filtros.precoMax}
              onChange={(e) => setFiltros({...filtros, precoMax: Number(e.target.value)})}
              className="w-full mt-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Quartos: {filtros.quartos}+</label>
            <input
              type="range"
              min="0"
              max="5"
              value={filtros.quartos}
              onChange={(e) => setFiltros({...filtros, quartos: Number(e.target.value)})}
              className="w-full mt-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Área Mínima: {filtros.areaMin}m²</label>
            <input
              type="range"
              min="0"
              max="500"
              step="10"
              value={filtros.areaMin}
              onChange={(e) => setFiltros({...filtros, areaMin: Number(e.target.value)})}
              className="w-full mt-2"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ImovelFiltro;
