import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import RecuperarSenha from './components/RecuperarSenha';
import CriarConta from './components/CriarConta';
import Tarefas from './components/Tarefas';
import Leads from './components/Leads';
import PerfilCorretor from './components/PerfilCorretor';
import Imoveis from './pages/Imoveis';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/criar-conta" element={<CriarConta />} />
        <Route path="/tarefas" element={<Tarefas />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/perfil" element={<PerfilCorretor />} />
        <Route path="/imoveis" element={<Imoveis />} />
      </Routes>
    </Router>
  );
}

export default App;
