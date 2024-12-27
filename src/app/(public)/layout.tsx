import { Metadata } from 'next';
import Layout from '@components/Layout/Layout';

interface AppLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'Sakai',
    description: 'Projeto Sakai',
    robots: { index: false, follow: false },
    openGraph: {
        type: 'website',
        title: 'Sakai',
        url: 'https://sakai.primereact.org/',
        description: 'Projeto Sakai.',
        images: ['https://www.primefaces.org/static/social/sakai-react.png'],
        ttl: 604800
    },
    icons: {
        icon: '/favicon.ico'
    }
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default function AppLayout({ children }: AppLayoutProps) {
    return <Layout>{children}</Layout>;
}
