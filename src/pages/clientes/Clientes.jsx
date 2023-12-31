import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { formatarCnpj, handleCepChange, formataTelefone } from './CadastraEmpresa';

function Clientes() {
  const BASE_URL = "http://localhost:8080"

  const [clientes, setClientes] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [searchCnpj, setSearchCnpj] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [clienteToEdit, setClienteToEdit] = useState(null);
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/clientes`);
        setClientes(response.data);
        setClientesFiltrados(response.data);
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

  const openEditModal = (cliente) => {
    setClienteToEdit(cliente);
    setNome(cliente.ds_nome);
    setSenha(cliente.ds_senha);
    setEmpresa(cliente.nm_empresa);
    setCnpj(formatarCnpj(cliente.nr_cnpj)); 
    setCep(handleCepChange(cliente.nr_cep, setCep, setEndereco));
    setEndereco(cliente.ds_endereco);
    setNumero(cliente.nr_numero);
    setTelefone(formataTelefone(cliente.nr_telefone)); 
    setEmail(cliente.ds_email);
    setShowEditModal(true);
  }

  const closeEditModal = () => {
    setShowEditModal(false);
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

  const handleEdit = async (cliente) => {
    const editedCliente = {
      id: cliente.id,
      ds_nome: nome,
      ds_senha: senha,
      nm_empresa: empresa,
      nr_cnpj: cnpj,
      nr_cep: cep,
      ds_endereco: endereco,
      nr_numero: numero,
      nr_telefone: telefone,
      ds_email: email,
    };

    try {
      await axios.put(`${BASE_URL}/clientes/${cliente.id}`, editedCliente);
      setClientes(clientes.map(c => c.id === cliente.id ? editedCliente : c));
      closeEditModal();
    } catch (error) {
      toast.error('Erro ao editar cliente', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      closeEditModal();
    }
  }

  const handleSearchCnpj = (event) => {
    const valorPesquisa = event.target.value.toLowerCase();

    if (valorPesquisa === '') {
      setClientesFiltrados(clientes);
    } 
    else {
      const clientesFiltrados = clientes.filter((cliente) => 
        cliente.nr_cnpj.toLowerCase().includes(valorPesquisa)
      );

      setClientesFiltrados(clientesFiltrados);
    }

    setSearchCnpj(valorPesquisa);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header/>
      <section className='flex-1 bg-purple-200 flex justify-center'>
        <div className='w-6/12 h-4/6 mt-20 bg-gradient-to-r from-purple-600/30
          via-indigo-500/30 to-cyan-400/30 rounded-3xl flex flex-col items-center'>
          <h2 className='text-white font-mono text-xl mt-10'>Clientes</h2>

          <div className='relative w- flex items-end'>
            <input
              className='bg-violet-500 p-1 mt-3 mb-3 rounded-md text-white pl-8'
              placeholder='Pesquisa por CNPJ'
              value={searchCnpj}
              onChange={handleSearchCnpj}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className='text-white absolute left-2 top-1/2 transform -translate-y-1/2'
            />
          </div>
          <div className='bg-zinc-600/50 w-5/6 h-10 rounded-md flex mt-15'>
            <span className='ml-5 w-8 text-white'></span>
            <span className='w-24 text-white ml-3'>Cliente</span>
            <span className='w-36 text-white ml-3'>Empresa</span>              
            <span className='w-40 text-white ml-3'>CNPJ</span>
          </div>
          <ul className='w-10/12 h-5/6 mt-7 ulClientes overflow-y-auto'>

            {clientesFiltrados.map((cliente) => (
              <div className='mt-5'>
                <li className='bg-zinc-600/30 w-full h-8 rounded-md flex mt-15' key={cliente.id}>
                  <span className='ml-5 w-8 text-white'>{cliente.id}</span>
                  <span className='w-24 text-white truncate ml-3'>{cliente.ds_nome}</span>
                  <span className='w-36 text-white truncate ml-3'>{cliente.nm_empresa}</span>
                  <span className='w-40 text-white truncate ml-3'>{cliente.nr_cnpj}</span>
                  <div className="flex ml-auto items-center mr-3">
                    <FontAwesomeIcon icon={faEdit} className="text-white mr-2 cursor-pointer" onClick={() => openEditModal(cliente)} />
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

            {showEditModal && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col">
                  <h2 className="text-xl mb-3">Editar Cliente</h2>
                  <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="mb-2" placeholder="Nome" />
                  <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} className="mb-2" placeholder="Senha" />
                  <input type="text" value={empresa} onChange={(e) => setEmpresa(e.target.value)} className="mb-2" placeholder="Empresa" />
                  <input type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)} className="mb-2" placeholder="CNPJ" />
                  <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} className="mb-2" placeholder="CEP"/>
                  <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} className="mb-2" placeholder="Endereço" />
                  <input type="number" value={numero} onChange={(e) => setNumero(e.target.value)} className="mb-2" placeholder="Número" />
                  <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} className="mb-2" placeholder="Telefone" />
                  <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-2" placeholder="Email" />
                  <div className="flex justify-end">
                    <button className="bg-violet-500 text-white px-4 py-2 rounded mr-3" onClick={() => handleEdit(clienteToEdit)}>Salvar</button>
                    <button className="bg-gray-300 text-black px-4 py-2 rounded" onClick={closeEditModal}>Cancelar</button>
                  </div>
                </div>
              </div>
            )}

          </ul>

          <Link to={"/empresa/cadastrar"}>
            <div className='w-56 flex items-center justify-center h-[35px] rounded-2xl bg-violet-600/75 mb-5 mt-3'>
              <span className='text-white'>Adicionar novo cliente</span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Clientes;
