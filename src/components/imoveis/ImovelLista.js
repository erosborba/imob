import React from 'react';
import ImovelCard from './ImovelCard';

function ImovelLista({ imoveis, filtros, busca, abrirModalEdicao, handleDelete, formatarPreco }) {
  console.log("Renderizando ImovelLista com", imoveis.length, "imóveis");
  console.log("Filtros aplicados:", filtros);
  console.log("Busca:", busca);
  
  const imoveisFiltrados = imoveis.filter(imovel => {
    console.log("Filtrando imóvel:", imovel);

    // Aplicar busca
    if (busca) {
      const buscaLowerCase = busca.toLowerCase();
      const enderecoMatch = imovel.endereco && imovel.endereco.toLowerCase().includes(buscaLowerCase);
      const tipoMatch = imovel.tipo && imovel.tipo.toLowerCase().includes(buscaLowerCase);
      const tituloMatch = imovel.titulo && imovel.titulo.toLowerCase().includes(buscaLowerCase);
      if (!(enderecoMatch || tipoMatch || tituloMatch)) {
        return false;
      }
    }

    // Aplicar filtros
    if (filtros.tipo && imovel.tipo !== filtros.tipo) return false;
    if (filtros.precoMin && parseFloat(imovel.preco) < filtros.precoMin) return false;
    if (filtros.precoMax && parseFloat(imovel.preco) > filtros.precoMax) return false;
    if (filtros.quartos && parseInt(imovel.quartos) < filtros.quartos) return false;
    if (filtros.areaMin && parseFloat(imovel.area) < filtros.areaMin) return false;

    return true;
  });

  console.log("Imóveis filtrados:", imoveisFiltrados.length);

  return (
    <div className="flex-grow overflow-auto p-4 space-y-4">
      {imoveisFiltrados.map(imovel => (
        <ImovelCard
          key={imovel.id}
          imovel={imovel}
          abrirModalEdicao={abrirModalEdicao}
          handleDelete={handleDelete}
          formatarPreco={formatarPreco}
        />
      ))}
    </div>
  );
}

export default ImovelLista;
