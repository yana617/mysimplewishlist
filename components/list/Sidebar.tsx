import Link from 'next/link';

import { Database } from '@/lib/schema';
import { Title } from '../Header';
import { AddListForm } from './AddListForm';

type List = Database['public']['Tables']['list']['Row'];

export const Sidebar = async ({ listId, lists }: { listId?: string; lists: List[] }) => {
    return (
        <div className='drawer-side -mt-16 max-h-[100vh]'>
            <ul className='menu min-h-full w-80 bg-base-200 p-4 text-base-content'>
                <div className='mt-12 mb-4 flex h-16 w-full items-center justify-center'>
                    <Title styles='mobile:pr-2 text-center text-xl font-medium tracking-[0.5px]' />
                </div>
                {lists.map((list) => (
                    <li key={list.id} className={list.id === listId ? 'rounded-lg bg-base-300' : ''}>
                        <Link href={`/home/${list.id}`}>{list.name}</Link>
                    </li>
                ))}

                <AddListForm />
            </ul>
        </div>
    );
};
