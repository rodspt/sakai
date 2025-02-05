/* eslint-disable @next/next/no-img-element */
'use client';


import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Router from "next/router";
import { Button } from "primereact/button";
import { useSearchParams } from 'next/navigation';

const Dashboard = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl');
  
    async function handleSignIn() {
        await signIn('github', { callbackUrl: '/home' })
      }
    
      async function handleClick() {
        Router.push('/home')
      }

    return (
        <div className="p-5 w-full h-dvh flex items-center overflow-hidden gap-20">
      
        <div className="w-[400px]">
          <div className="w-[85%]">
            <h1 className="text-2xl font-bold text-white">Boas vindas!</h1>
            <p className="text-base font-normal text-zinc-300">
              Faça seu login ou acesse como visitante.
            </p>
          </div>
          <div className="flex flex-col gap-3 mt-3 w-[85%]">
          <Button
      className='w-full'
      type='button'
      onClick={() =>
        signIn('github', { callbackUrl: callbackUrl ?? '/home' })
      }
    >
      Continue with Github
    </Button>
            <button
              className="p-4 bg-[#252D4A] rounded-md flex items-center gap-3.5 font-bold text-lg text-white hover:brightness-125 transition ease-in-out duration-150 animate-from-down-to-up" onClick={handleClick}>
              Acessar como visitante
            </button>
          </div>
        </div>
      </div>
    );
};

export default Dashboard;
