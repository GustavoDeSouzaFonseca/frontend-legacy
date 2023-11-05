import React, { useState } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import { toast } from 'react-toastify';

function CadastraEmpresa() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [cnpj, setCnpj] = useState('');
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
      ds_endereco: endereco,
      nr_numero: numero,
      nr_telefone: telefone,
      ds_email: email
    }

    try {
      axios.post("http://localhost:8080/clientes", body)
      .then((response) => {
        if(response.status === 200) {
          toast.success('Empresa criada com sucesso!', {
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
          setEndereco('');
          setNumero('');
          setTelefone('');
          setEmail('');

          return;
        } else {
          toast.error(response.statusText, {
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
      })
      .catch((err) => {
        console.log("errou")
        return(toast.error("Erro interno do servidor", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }));
      })
    } catch (error) {
      toast.error("errou", {
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

  const formatarCnpj = (cnpj) => {
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
  

  return (
    <div className="flex flex-col h-screen">
      <Header/>
      <section className='flex-1 bg-purple-200 flex justify-center'>

        <div className='w-5/12 h-4/6 mt-20 bg-gradient-to-r from-purple-600/30
          via-indigo-500/30 to-cyan-400/30 rounded-3xl flex flex-col items-center'>
            <h2 className='text-white font-mono text-xl mt-10'>Cadastra Empresa</h2>

            <div className='w-5/6 mt-5'>
              <div className='flex flex-row justify-between'>
                <input  className='bg-zinc-600/50 w-6/12 mr-1 p-1 h-10 rounded-md flex' type='text' placeholder='nome' value={nome} onChange={(e) => {setNome(e.target.value)}} />
                <input className='bg-zinc-600/50 w-6/12 ml-1 p-1 h-10 rounded-md flex' type='password' placeholder='senha' value={senha} onChange={(e) => {setSenha(e.target.value)}}/>
              </div>
              <input className='bg-zinc-600/50 w-full p-1 h-10 mt-1 rounded-md flex' type='text' placeholder='empresa' value={empresa} onChange={(e) => {setEmpresa(e.target.value)}}/>
              <input
                className='bg-zinc-600/50 w-full p-1 h-10 mt-1 rounded-md flex'
                type='text'
                placeholder='cnpj'
                value={formatarCnpj(cnpj)}
                onChange={(e) => {
                  const novoCnpj = e.target.value;
                  const cnpjFormatado = formatarCnpj(novoCnpj);

                  setCnpj(cnpjFormatado);
                }}
              />
              <div className='flex flex-row justify-between w-full'>
                <input className='bg-zinc-600/50 w-8/12 mr-1 p-1 h-10 mt-1 rounded-md flex' type='text' placeholder='endereco' value={endereco} onChange={(e) => {setEndereco(e.target.value)}}/>
                <input className='bg-zinc-600/50 w-4/12 ml-1 p-1 h-10 mt-1 rounded-md flex' type='text' placeholder='numero' value={numero} onChange={(e) => {setNumero(e.target.value)}}/>
              </div>
            <input className='bg-zinc-600/50 w-full p-1 h-10 mt-1 rounded-md flex' type='text' placeholder='email' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            <div className='w-full flex flex-row justify-between'>
              <input className='bg-zinc-600/50 w-3/6 p-1 mr-1 h-10 mt-1 rounded-md flex' type='text' placeholder='telefone' value={telefone} onChange={(e) => {setTelefone(e.target.value)}}/>
              <button className='bg-violet-500 text-white w-3/6 ml-1 h-10 mt-1 items-center justify-center rounded-md flex' onClick={handleCriaEmpresa}>Criar Empresa</button>
            </div>
            </div>
        </div>
      </section>
    </div>  
  );
}

export default CadastraEmpresa;
