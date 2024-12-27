import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react";
import  { NextAuthConfig, User } from 'next-auth';
import { AxioInstanceService } from "@/globals/services/AxioInstanceService";

interface CustomToken {
  user: any;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  perfil: object;
}

const expiracao = async(minutos: number) => {
  return new Date(Date.now() + minutos * 60000).getTime();
}

const executeRefresh = async(token: any) => {
   const tokenRefresh = token.refreshToken;
   if(!tokenRefresh) signOut();

  const result = await AxioInstanceService.post(`${process.env.NEXT_PUBLIC_API_URL}`,{refresh_token: tokenRefresh });
  if(result.data?.access_token){
    token.accessToken = result.data?.access_token;
    token.expiresIn = await expiracao(result.data.expires_in);
  }else{
    signOut({ callbackUrl: "/expirado" });
  }
  return token;
}


export const authOptions: NextAuthConfig = {
  pages: {
      signIn: "/",
  },
  providers: [
      CredentialsProvider({
          name: "Credentials",
          credentials: {
              cpf: {},
              password: {},
          },
          async authorize(credentials: any, req: any) {
              const axios = AxioInstanceService;
              const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, credentials);
            
              let user = await res.data.user;
              user.name = res.data.user.nome;
              user.accessToken = res.data.access_token;
              user.refreshToken = res.data.refresh_token;
              user.expiresIn = await expiracao(res.data.expires_in)
             
              return  user;
          },
      }),
  ],
  callbacks: {
      async session({ session, token }) {
        
         return {
          ...session,
          perfil: token.perfil,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          expiresIn: token.expiresIn
      }
   },
   jwt: async ({ token, user, account, session, trigger }): Promise<any> => {



          if(user) {
            token.refreshToken = user?.refreshToken;
            token.accessToken = user?.accessToken;
            token.expiresIn = user?.expiresIn ?? 0;
            token.perfil = user?.perfil;
          }

          /* Atualizacao via Client - Interceptor */
          if (trigger === "update" && session) {
              if (session.accessToken) {
                token.accessToken = session.accessToken;
                token.expiresIn = session.expiresIn ?? 0;
              }
              if (session.accessToken) {
                token.refreshToken = session.refreshToken;
              }
          }

          /* Atualizacao Server - Expiracao ultimo token */
          if(typeof token.expiresIn! == "number" && Date.now() >= token.expiresIn){
            token = await executeRefresh(token);
          }
          
          return token;
      },
      async redirect({ url }) {
          return `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/home`
      }

    },
    events: {
      async signOut() {
      
      //Evento logout
    }
  }
});
