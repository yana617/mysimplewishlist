import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { SubmitButton } from './submit-button';
import { LandingHeader } from '@/components/Header';

export default function Login({ searchParams }: { searchParams: { message: string } }) {
    const signIn = async (formData: FormData) => {
        'use server';

        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const supabase = createClient();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return redirect('/login?message=Could not authenticate user');
        }

        return redirect('/home');
    };

    const signUp = async (formData: FormData) => {
        'use server';

        const origin = headers().get('origin');
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const supabase = createClient();

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${origin}/auth/callback`,
            },
        });

        if (error) {
            return redirect('/login?message=Could not authenticate user');
        }

        return redirect('/login?message=Check email to continue sign in process');
    };

    return (
        <>
            <LandingHeader />
            <div className='flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md'>
                <form className='animate-in flex w-full flex-1 flex-col justify-center gap-2 text-foreground'>
                    <label className='text-md' htmlFor='email'>
                        Email
                    </label>
                    <input
                        className='mb-6 rounded-md border bg-inherit px-4 py-2'
                        name='email'
                        placeholder='you@example.com'
                        required
                    />
                    <label className='text-md' htmlFor='password'>
                        Password
                    </label>
                    <input
                        className='mb-6 rounded-md border bg-inherit px-4 py-2'
                        type='password'
                        name='password'
                        placeholder='••••••••'
                        required
                    />
                    <SubmitButton
                        formAction={signIn}
                        className='bg-blue mb-2 rounded-md px-4 py-2 text-white'
                        pendingText='Signing In...'
                    >
                        Sign In
                    </SubmitButton>
                    <SubmitButton
                        formAction={signUp}
                        className='mb-2 rounded-md border border-foreground/20 px-4 py-2 text-foreground'
                        pendingText='Signing Up...'
                    >
                        Sign Up
                    </SubmitButton>
                    {searchParams?.message && (
                        <p className='mt-4 bg-foreground/10 p-4 text-center text-foreground'>
                            {searchParams.message}
                        </p>
                    )}
                </form>
            </div>
        </>
    );
}
