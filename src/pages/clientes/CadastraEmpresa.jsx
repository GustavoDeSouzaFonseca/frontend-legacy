import React, { useState } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const formatarCnpj = (cnpj) => {
  const numeros = cnpj.replace(/\D/g, '');

  let cnpjFormatado = numeros;

  if (numeros.length > 2) {
    cnpjFormatado = `${numeros.substring(0, 2)}.${numeros.substring(2)}`;
  }

  if (numeros.length > 5) {
    cnpjFormatado = `${cnpjFormatado.substring(0, 6)}.${cnpjFormatado.substring(6)}`;
  }

  if (numeros.length > 9) {
    cnpjFormatado = `${cnpjFormatado.substring(0, 10)}/${cnpjFormatado.substring(10)}`;
  }

  if (numeros.length > 13) {
    cnpjFormatado = `${cnpjFormatado.substring(0, 15)}-${cnpjFormatado.substring(15)}`;
  }

  if (numeros.length > 14) {
    cnpjFormatado = cnpjFormatado.substring(0, 18);
  }

  return cnpjFormatado;
}

export const handleCepChange = async (cep, setCep, setEndereco) => {
  const numeros = cep.replace(/\D/g, '');  
  let cepFormatado = numeros;

  if(numeros.length > 5) {
    cepFormatado = `${cepFormatado.substring(0,5)}-${cepFormatado.substring(5)}`
  }

  if(numeros.length > 7) {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cepFormatado}/json/`);
      
      if (response.data.erro) {
        toast.error('CEP não encontrado', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        setEndereco(response.data.logradouro);
      }
    } catch (error) {
      toast.error('Erro ao buscar CEP', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
  }

  if(numeros.length > 8) {
    cepFormatado.substring(0,8);
  }

  setCep(cepFormatado);
  return cepFormatado;
}

export const formataTelefone = (tel) => {
  const numeros = tel.replace(/\D/g, '');

  let telFormatado = numeros;

  if(numeros.length > 10) {
    telFormatado = `+ 55 (${telFormatado.substring(0,2)}) ${telFormatado.substring(2,3)} ${telFormatado.substring(3,7)}-${telFormatado.substring(7,11)}`
  }

  if(numeros.length > 11) {
    telFormatado = telFormatado.substring(0,11);
  }
  return telFormatado;
}

function CadastraEmpresa() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  const handleCriaEmpresa = () => {
    const body = {
      ds_nome: nome,
      ds_senha: senha,
      nm_empresa: empresa,
      nr_cnpj: cnpj,
      nr_cep: cep,
      ds_endereco: endereco,
      nr_numero: numero,
      nr_telefone: telefone,
      ds_email: email
    }

    try {
      axios.post("http://localhost:8080/clientes", body)
      .then((response) => {
        if(response.status === 200) {
          console.log("teste");

          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />

          toast.success("Empresa criada com sucesso", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          setNome('');
          setSenha('');
          setEmpresa('');
          setCnpj('');
          setCep('');
          setEndereco('');
          setNumero('');
          setTelefone('');
          setEmail('');

          return;
        } else if (response.data.erro) {
          toast.error(response.data.erro, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .catch((err) => {
        toast.error('Erro interno de servidor', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
    } catch (error) {
      toast.error("Erro de server", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <Header/>
      <section className='flex-1 bg-purple-200 flex justify-center'>

        <div className='w-5/12 h-4/6 mt-20 bg-gradient-to-r from-purple-600/30
          via-indigo-500/30 to-cyan-400/30 rounded-3xl flex flex-col items-center'>
            <h2 className='text-white font-mono text-xl mt-10'>Cadastra Empresa</h2>

            <div className='w-5/6 mt-5'>
              <div className='flex flex-row justify-between'>
                <input
                  className='bg-zinc-600/50 w-6/12 mr-1 p-1 h-10 rounded-md flex'
                  type='text'
                  placeholder='nome'
                  value={nome}
                  onChange={(e) => {
                    const novoNome = e.target.value;
                    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]*$/; // Esta regex permite letras, espaços e acentuação

                    if (regex.test(novoNome) || novoNome === '') {
                      setNome(novoNome);
                    }
                  }}
                />
                <input className='bg-zinc-600/50 w-6/12 ml-1 p-1 h-10 rounded-md flex' type='password' placeholder='senha' value={senha} onChange={(e) => {setSenha(e.target.value)}}/>
              </div>
              <input className='bg-zinc-600/50 w-full p-1 h-10 mt-1 rounded-md flex' type='text' placeholder='empresa' value={empresa} onChange={(e) => {setEmpresa(e.target.value)}}/>
              <div className='w-full flex flex-row justify-between'>
                <input
                  className='bg-zinc-600/50 w-7/12 mr-1 p-1 h-10 mt-1 rounded-md flex'
                  type='text'
                  placeholder='cnpj'
                  value={formatarCnpj(cnpj)}
                  onChange={(e) => {
                    const novoCnpj = e.target.value;
                    const cnpjFormatado = formatarCnpj(novoCnpj);

                    setCnpj(cnpjFormatado);
                  }}
                />
                <input 
                  className='bg-zinc-600/50 w-5/12 mr-1 p-1 h-10 mt-1 rounded-md flex' 
                  type='text' 
                  placeholder='cep' 
                  value={cep} 
                  onChange={(e) => {
                    const novoCep = e.target.value;
                    handleCepChange(novoCep, setCep, setEndereco)
                  }}
                />
              </div>
              <div className='flex flex-row justify-between w-full'>
                <input 
                  className='bg-zinc-600/50 w-8/12 mr-1 p-1 h-10 mt-1 rounded-md flex' 
                  type='text' 
                  placeholder='endereco' 
                  value={endereco} 
                  onChange={(e) => {setEndereco(e.target.value)}}
                />
                <input
                  className='bg-zinc-600/50 w-4/12 ml-1 p-1 h-10 mt-1 rounded-md flex'
                  type='text'
                  placeholder='numero'
                  value={numero}
                  onChange={(e) => {
                    const novoNumero = e.target.value;
                    const regex = /^[0-9]*$/; 

                    if (regex.test(novoNumero) || novoNumero === '') {
                      setNumero(novoNumero);
                    }
                  }}
                />
              </div>
              <input
                className='bg-zinc-600/50 w-full p-1 h-10 mt-1 rounded-md flex'
                type='text'
                placeholder='email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

            <div className='w-full flex flex-row justify-between'>
              <input 
                className='bg-zinc-600/50 w-3/6 p-1 mr-1 h-10 mt-1 rounded-md flex' 
                type='text' 
                placeholder='telefone' 
                value={telefone} 
                onChange={(e) => {
                  const novoTelefone = e.target.value;
                  const telFormatado = formataTelefone(novoTelefone);

                  setTelefone(telFormatado)
                }}
              />
              <ToastContainer />
              <button className='bg-violet-500 text-white w-3/6 ml-1 h-10 mt-1 items-center justify-center rounded-md flex' onClick={handleCriaEmpresa}>Criar Empresa</button>
            </div>
            <Link to={"/clientes"}>
              <div className='bg-violet-500/40 text-white ml-1 h-10 mt-1 items-center justify-center rounded-md flex'>
                voltar
              </div>
            </Link>
            </div>
        </div>
      </section>
    </div>  
  );
}

export default CadastraEmpresa;
