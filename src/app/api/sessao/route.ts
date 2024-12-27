import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  const data = session?.accessToken ?? null;

  return new Response(JSON.stringify({ token: data }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
