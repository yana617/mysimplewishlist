'use client';

import { useRouter } from 'next/navigation';

import { generatePrimaryButtonStyles } from '@/lib/styles';
import { ExampleWish } from '../wish/ExampleWish';

const wishes = [
    {
        label: 'Certificate for a back massage',
        checked: true,
        link: 'https://www.klook.com/experiences/list/seoul-spa-massages/c13-cate21/',
    },
    {
        label: 'Set of mugs',
        checked: false,
    },
    {
        label: 'Treats for my dog',
        checked: true,
    },
];

export const ExampleWishlist = () => {
    const router = useRouter();

    const copyToClipboard = () => {
        navigator.clipboard.writeText('https://mysimplewishlist.com');
    };
    const onSubmit = (e: any) => {
        e.preventDefault();
        void router.push('/login');
    }

    return (
        <main className='mobile:hidden relative flex h-[500px] w-[700px] items-center justify-center rounded-2xl border border-solid border-base-300 text-dark-green'>
            <div className='flex flex-col gap-2 py-8'>
                <div className='mb-8 flex items-center justify-center gap-6'>
                    <b className='text-2xl'>Kate B-DAY 27/07</b>
                    <button
                        className={generatePrimaryButtonStyles()}
                        //@ts-ignore
                        onClick={() => document.getElementById('join_modal')?.showModal()}
                    >
                        + Add
                    </button>
                </div>
                <div className='mobile:ml-0 -ml-12 flex flex-col'>
                    {wishes.map((wish, index) => {
                        return <ExampleWish key={index} {...wish} />;
                    })}
                </div>
            </div>
            <button
                className={generatePrimaryButtonStyles('absolute bottom-4 right-4')}
                onClick={copyToClipboard}
            >
                Copy share link
            </button>

            <dialog id='join_modal' className='modal'>
                <div className='mobile:w-[90%] modal-box w-[330px]'>
                    <form method='dialog'>
                        <button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>✕</button>
                    </form>
                    <h3 className='text-lg font-bold'>Join to create a new wishlist?</h3>
                    <form className='flex flex-col gap-4 py-4' onSubmit={onSubmit}>
                        <button className={generatePrimaryButtonStyles()}>yup!</button>
                    </form>
                </div>
                <form method='dialog' className='modal-backdrop'>
                    <button>close</button>
                </form>
            </dialog>
        </main>
    );
};
