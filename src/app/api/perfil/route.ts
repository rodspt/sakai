import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  const data = session?.perfil?.id ?? null;

  return new Response(JSON.stringify({ perfil: data }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
