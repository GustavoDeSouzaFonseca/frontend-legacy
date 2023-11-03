import React from 'react';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Header/>
      <section className='flex-1 bg-purple-200 flex justify-center'>
        <div className='w-5/12 h-4/6 mt-20 bg-gradient-to-r from-purple-600/30
         via-indigo-500/30 to-cyan-400/30 rounded-3xl flex flex-col justify-around items-center'>
          <span className='text-white font-mono text-xl'>Clientes</span>

          <Link to={"/clientes"}>
            <button className='bg-zinc-400 w-36 h-10 rounded-xl text-white'>Ver lista</button>
          </Link>

        </div>
      </section>
    </div>
  );
}

export default Home;