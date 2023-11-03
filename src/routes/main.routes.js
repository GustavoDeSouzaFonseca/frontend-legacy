import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';
import Clientes from '../pages/clientes/Clientes';
import CadastraEmpresa from '../pages/clientes/CadastraEmpresa';

function MainRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path='/' element={<Home />}/>
        <Route  path='/clientes' element={<Clientes />}/>
        <Route  path='/empresa/cadastrar' element={<CadastraEmpresa />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoute;