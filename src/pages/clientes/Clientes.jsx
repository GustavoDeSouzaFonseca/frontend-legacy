import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Clientes() {
  const BASE_URL = "http://localhost:8080"

  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState(null);


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

  const openModal = (clienteId) => {
    setClienteToDelete(clienteId);
    setShowModal(true);
  }
  
  const closeModal = () => {
    setClienteToDelete(null);
    setShowModal(false);
  }
  
  const handleDelete = async (clienteId) => {
    try {
      await axios.delete(`${BASE_URL}/clientes/${clienteId}`);
      setClientes(clientes.filter(cliente => cliente.id !== clienteId));
      closeModal();
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      closeModal();
    }
  }
  

  return (
    <div className="flex flex-col h-screen">
      <Header/>
      <section className='flex-1 bg-purple-200 flex justify-center'>
        <div className='w-5/12 h-4/6 mt-20 bg-gradient-to-r from-purple-600/30
          via-indigo-500/30 to-cyan-400/30 rounded-3xl flex flex-col items-center'>
          <h2 className='text-white font-mono text-xl mt-10'>Clientes</h2>
          <div className='bg-zinc-600/50 w-5/6 h-10 rounded-md flex mt-15'>
              <span className='ml-5 w-8 text-white'></span>
              <span className='w-24 text-white ml-3'>Nome</span>
              <span className='w-36 text-white ml-3'>Empresa</span>
            </div>
          <ul className='w-10/12 h-5/6 mt-7 ulClientes overflow-y-auto'>
            
            {clientes.map(cliente => (
              <div className='mt-5'>
                <li className='bg-zinc-600/30 w-full h-8 rounded-md flex mt-15' key={cliente.id}>
                  <span className='ml-5 w-8 text-white'>{cliente.id}</span>
                  <span className='w-24 text-white truncate ml-3'>{cliente.ds_nome}</span>
                  <span className='w-36 text-white truncate ml-3'>{cliente.nm_empresa}</span>
                  <div className="flex ml-auto items-center mr-3">
                    <FontAwesomeIcon icon={faEdit} className="text-white mr-2 cursor-pointer"/>
                    <FontAwesomeIcon icon={faTrash} className="text-white cursor-pointer" onClick={() => openModal(cliente.id)}/>
                  </div>
                </li>
              </div>
            ))}

            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-5 rounded-lg shadow-lg">
                  <p className="mb-3">Tem certeza que deseja excluir este cliente?</p>
                  <div className="flex justify-end">
                    <button className="bg-violet-500 text-white px-4 py-2 rounded mr-3" onClick={() => handleDelete(clienteToDelete)}>Excluir</button>
                    <button className="bg-gray-300 text-black px-4 py-2 rounded" onClick={closeModal}>Cancelar</button>
                  </div>
                </div>
              </div>
            )}
          </ul>

          <Link to={"/empresa/cadastrar"}>
            <div className='w-56 flex items-center justify-center h-[35px] rounded-2xl bg-zinc-600 mb-5 mt-3'>
              <span className='text-white'>Criar uma nova empresa</span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Clientes;