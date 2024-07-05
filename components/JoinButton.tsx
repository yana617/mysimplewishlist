'use client';

import { useRouter } from 'next/navigation';

import { generatePrimaryButtonStyles } from '@/lib/styles';

export const JoinButton = ({ styles, label }: { styles: string; label: string }) => {
    const router = useRouter();

    return (
        <button className={generatePrimaryButtonStyles(styles)} onClick={() => router.push('/login')}>
            {label}
        </button>
    );
};
