import { LoginPage } from '@/src/views/login';

export default function Login({ searchParams }: { searchParams: { message: string } }) {
    return <LoginPage searchParams={searchParams} />;
}
