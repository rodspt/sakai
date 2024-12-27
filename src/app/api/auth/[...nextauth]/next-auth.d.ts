import { User } from "next-auth";
import "next-auth/jwt";
import { DefaultSession } from 'next-auth';

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}

interface Perfil {
  id: number;
  name: string;
}


declare module "next-auth" {
  interface User {
    cpf: string;
    nome: string;
    email: string;
    perfil: Perfil;
    accessToken: string;
    refreshToken: string;
    expiresIn: any;
  }

  interface Session extends DefaultSession {
    user: User;
    perfil: Perfil;
    accessToken: string;
    refreshToken: string;
    expiresIn: any;
  }
}
