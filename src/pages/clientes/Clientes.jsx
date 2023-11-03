import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Clientes() {
  const BASE_URL = "http://localhost:8080"

  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    async function fetchClientes() {
      try {
        const response = await axios.get(`${BASE_URL}/clientes`);
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    }
    fetchClientes();
  }, []);


  return (
    <div className="flex flex-col h-screen">
      <Header/>
      <section className='flex-1 bg-purple-200 flex justify-center'>
        <div className='w-5/12 h-4/6 mt-20 bg-gradient-to-r from-purple-600/30
          via-indigo-500/30 to-cyan-400/30 rounded-3xl flex flex-col items-center'>
          <h2 className='text-white font-mono text-xl mt-10'>Clientes</h2>
          <ul className='w-10/12 h-5/6 mt-7'>
            <div className='bg-zinc-600/30 w-full h-8 rounded-md flex mt-15'>
              <span className='ml-5 w-8 text-white'></span>
              <span className='w-24 text-white'>Nome</span>
              <span className='w-36 text-white'>Empresa</span>
            </div>
            {clientes.map(cliente => (
              <div className='mt-5'>
                <li className='bg-zinc-600/30 w-full h-8 rounded-md flex mt-15' key={cliente.id}>
                  <span className='ml-5 w-8 text-white'>{cliente.id}</span>
                  <span className='w-24 text-white'>{cliente.ds_nome}</span>
                  <span className='w-36 text-white'>{cliente.nm_empresa}</span>
                  <div className="flex ml-auto items-center mr-3">
                    <FontAwesomeIcon icon={faEdit} className="text-white mr-2 cursor-pointer" />
                    <FontAwesomeIcon icon={faTrash} className="text-white cursor-pointer" />
                  </div>
                </li>
              </div>
            ))}
          </ul>
          <Link to={"/empresa/cadastrar"}>
            <div className='w-56 flex items-center justify-center h-[35px] rounded-2xl bg-zinc-600 mb-5'>
              <span className='text-white'>Criar uma nova empresa</span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Clientes;