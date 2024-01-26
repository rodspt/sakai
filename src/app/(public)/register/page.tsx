/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { Button } from 'primereact/button';
import { LayoutContext } from '@/globals/contexts/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Dropdown } from "primereact/dropdown";
import { InputValue } from "@/types";
import { UserRegister } from "@/types/layout";
import axios from "axios";
import { REGISTER_SOLICITACAO } from "@/globals/ApiEndPoints";



const RegisterPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [dropdownValue, setDropdownValue] = useState(null);
    const [solicitacao, setSolicitacao] = useState<UserRegister>({
        cpf: "",
        nome: "",
        email: "",
        perfil_id: null,
        password: "",
        password_confirmation: "",
      });
    const [errors, setErrors] = useState({
        cpf: [],
        nome: [],
        email: [],
        perfil_id: [],
        password: [],
    });
    

    const dropdownValues: InputValue[] = [
        { name: "Administrador", code: 2 },
        { name: "Consulta", code: 3 },
    ];
   
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        const perfil = dropdownValue?.code!;
        console.log(perfil);
        setSolicitacao({ ...solicitacao, perfil_id: perfil })
       
        await axios
          .post(REGISTER_SOLICITACAO, solicitacao, {
            headers: {
              Accept: "application/json",
            },
          })
          .then((res) => {
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log("Ocorreu um erro ", err.response?.data);
            setErrors(err.response?.data?.errors);
          });
      };

    const containerClassName = classNames('mt-3');
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
                    <div className="w-full surface-card py-3 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-2">
                            <div className="text-900 text-3xl font-medium break-words">SOLICITAÇÃO DE ACESSO</div>
                        </div>

                        <div>

                        <div className="field p-fluid">
                            <label htmlFor="cpf" className="block text-900 text-1xl font-medium mb-1">CPF</label>
                            <InputText id="cpf" type="text" 
                             onChange={(e) => setSolicitacao({ ...solicitacao, cpf: e.target.value })}
                            className={`w-full md:w-90rem ${errors?.cpf?.[0] ? 'p-invalid':''}`} />
                            <small id="cpf-help" className="p-error">{errors?.cpf?.[0]}</small>
                        </div>

                        <div className="field p-fluid">
                            <label htmlFor="nome" className="block text-900 text-1xl font-medium mb-1">Nome</label>
                            <InputText id="nome" type="text" 
                             onChange={(e) => setSolicitacao({ ...solicitacao, nome: e.target.value })}
                             className={`w-full md:w-90rem ${errors?.nome?.[0] ? 'p-invalid':''}`} />
                            <small id="nome-help" className="p-error">{errors?.nome?.[0]}</small>
                        </div>

                        <div className="field p-fluid">
                            <label htmlFor="email" className="block text-900 text-1xl font-medium mb-1">E-mail</label>
                            <InputText id="email" type="email" 
                            onChange={(e) => setSolicitacao({ ...solicitacao, email: e.target.value })}
                            className={`w-full md:w-90rem ${errors?.email?.[0] ? 'p-invalid':''}`} />
                            <small id="email-help" className="p-error">{errors?.email?.[0]}</small>
                        </div>

                        <div className="field p-fluid">
                            <label htmlFor="perfil" className="block text-900 text-1xl font-medium mb-1">Perfil</label>
                            <Dropdown
                                value={solicitacao?.perfil_id}
                                onChange={(e) => setDropdownValue(e.value)}
                                options={dropdownValues}
                                optionLabel="name"
                                placeholder="Selecione o perfil"
                                className={`${errors?.perfil_id?.[0] ? 'p-invalid':''}`} 
                            />
                            <small id="email-help" className="p-error">{errors?.perfil_id?.[0]}</small>
                        </div>



                        <div className="field p-fluid">
                            <label htmlFor="senha" className="block text-900 text-1xl font-medium mb-1">Senha</label>
                            <InputText id="senha" type="password" 
                             onChange={(e) => setSolicitacao({ ...solicitacao, password: e.target.value })}
                             className={`w-full md:w-90rem ${errors?.password?.[0] ? 'p-invalid':''}`} />
                            <small id="senha-help" className="p-error">{errors?.password?.[0]}</small>
                        </div>

                        <div className="field p-fluid">
                            <label htmlFor="senha2" className="block text-900 text-1xl font-medium mb-1">Confirmação de senha</label>
                            <InputText id="senha2" type="password" 
                            onChange={(e) => setSolicitacao({ ...solicitacao, password_confirmation: e.target.value })}
                            className="w-full md:w-90rem"/>
                        </div>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                 <Button disabled={loading} 
                                    label={loading ? "Processando.." : "Solicitar acesso"} 
                                    className="text-xl" onClick={handleSubmit}></Button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
