'use client';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '@styles/layout/layout.scss';
import { PrimeReactProvider } from 'primereact/api';
import { LayoutProvider } from '@providers/LayoutContext';
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import Tailwind from 'primereact/passthrough/tailwind';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';

interface RootLayoutProps {
    children: React.ReactNode;
    session: any;
}

export default function RootLayout({ children, session }: RootLayoutProps) {
    
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <head>
                <link id="theme-css" href={`/themes/lara-light-indigo/theme.css`} rel="stylesheet"></link>
            </head>
            <body>
                 <SessionProvider session={session}>
                    <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
                       <LayoutProvider>
                          <ToastContainer />
                           {children}
                        </LayoutProvider>
                    </PrimeReactProvider>
                 </SessionProvider>
            </body>
        </html>
    );
}
