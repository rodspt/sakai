import { DefaultSession, NextAuthConfig, User as NextAuthUser } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import "next-auth/jwt";
import { signOut } from 'next-auth/react';
import { PropagateToWorkersField } from 'next/dist/server/lib/router-utils/types';


interface Perfil {
  id: number;
  name: string;
}

declare module 'next-auth' {
  interface Session {
    user: {
      cpf: string;
      nome: string;
      email: string;
      telefone?: string;
      perfil?: Perfil;
      perfil_id?: string;
      status?: string;
    };
    access_token?: string; 
    refresh_token?: string; 
    expires_in?: number;
    id?: string;
    iat?: number;
    exp?: number;
    jti?: string;
  }
}

const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
      profile(profile: any, tokens: any) {
        console.log('------------------- profile --------------------')
        let user = authSocialMedia(profile.email);
        return user;
      },
    }),
    CredentialProvider({
      credentials: {
        email: {
          type: 'string'
        },
        password: {
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        console.log('------------------- autthorize --------------------')
       // const urlLogin = process.env.NEXT_PUBLIC_API_URL + "/login";
        const urlLogin = process.env.NEXT_PUBLIC_API_URL + "/credential";
        const res = await fetch(urlLogin, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email as string,
              password: credentials?.password as string,
            }),
          });

        let dados = await res.json(); 
        let user = dados?.user ?? null;

        console.log(dados)
        if (user) {
          user.name = dados.user.name ?? dados.user.nome;
        }
        return  user || null;

      }
    })
  ],
  callbacks: {
    async signIn({ account, profile }) {
      console.log('------------------- signIn --------------------')
      return true;
    },
    async session({ session, token }) {
      console.log('------------------- session --------------------')
      session = Object.assign({}, session, {user: token.user})
      session = Object.assign({}, session, {access_token: token.access_token})
      session = Object.assign({}, session, {refresh_token: token.refresh_token})
      console.log(session)
    


      return session;
 },
 jwt: async ({ token, user, account ,session, trigger }): Promise<any> => {
      console.log('------------------- jwt --------------------')
  
      token = { ...token, ...user };
        /* Atualizacao via Client - Interceptor */
        if (trigger === "update" && session) {
            if (session.access_token) {
              //token.access_token = session.access_token;
              //token.refresh_token = session.refresh_token;
              //token.expires_in = session.expiresIn ?? 0;
            }
            if (session.access_token) {
              //token.refresh_token = session.refresh_token;
            }
        }

      
        console.log('jwt-token-new')
        console.log(token)
        return token;
    },
  },
  pages: {
    signIn: '/' //sigin page
  }
} satisfies NextAuthConfig;


const authSocialMedia = async(email: string|null|undefined) => {
 
  if(email == null || email == undefined){
    return null;
  }else{
    var jwt = require('jsonwebtoken');
  
    const payload = {
      email: email,
      iat: Math.floor(Date.now() / 1000), 
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      sub: email, 
    };  
    const token = jwt.sign(payload, process.env.NEXTAUTH_SECRET);

    const urlSocial = process.env.NEXT_PUBLIC_API_URL + "/mail";
    console.log(urlSocial);
    const res = await fetch(urlSocial, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token?.toString()}`
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    
    return await res.json();
  }

}


export default authConfig;
