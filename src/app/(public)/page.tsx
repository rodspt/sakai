/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { Button } from 'primereact/button';
import { LayoutContext } from '@/globals/contexts/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

const LoginPage = () => {
    const [password, setPassword] = useState('');
    const { layoutConfig } = useContext(LayoutContext);

    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium break-words">PLATAFORMA DE GESTAO DO CAR</div>
                            <div className="text-900 text-3xl font-medium break-words mb-3">E VIVEIRO DA FLORESTA!</div>
                        </div>

                        <div>
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                E-mail
                            </label>
                            <InputText id="email1" type="email" placeholder="Informe seu e-mail " className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Senha
                            </label>
                            <InputText id="password1" type="password" placeholder="Informe sua senha" onChange={(e) => setPassword(e.target.value)} className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />


                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <div className="flex align-items-center">
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                     Esqueci minha senha
                                </a>
                                </div>
                                <a onClick={()=> router.push('/register')} className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                    Solicitar acesso
                                </a>
                            </div>
                            <Button label="Efetuar Login" className="w-full p-3 text-xl" onClick={() => router.push('/')}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
