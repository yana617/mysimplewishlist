'use client';

import { useContext, useEffect, useState } from 'react';

import { Database } from '@/lib/schema';
import { Wish } from '@/components/wish/Wish';
import { createClient } from '@/utils/supabase/client';
import { CreateWishModal } from '@/components/wish/CreateWishModal';
import { EditWishModal } from '@/components/wish/EditWishModal';
import { AuthContext } from '@/components/AuthProvider';
import { WishFormValues } from '@/components/wish/WishForm';

type List = Database['public']['Tables']['list']['Row'];
type Wish = Database['public']['Tables']['wish']['Row'];

type WishToEdit = { id: string } & WishFormValues;

export default function WishList({ params }: { params: any }) {
    const supabase = createClient();
    const [wishes, setWishes] = useState<Wish[]>([]);
    const [list, setList] = useState<Partial<List> | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [wishToEdit, setWishToEdit] = useState<WishToEdit | null>(null);
    const { userId } = useContext(AuthContext);

    useEffect(() => {
        const fetchWishes = async () => {
            const { data, error } = await supabase
                .from('wish')
                .select('id, label, checked, list_id, link')
                .order('label')
                .eq('list_id', params.id);

            if (error) console.log('error', error);
            else {
                setWishes(data);
                setIsLoading(false);
            }
        };

        const fetchList = async () => {
            const { data, error } = await supabase
                .from('list')
                .select('id, name, user_id')
                .eq('id', params.id)
                .single();

            if (!error) {
                setList(data);
                fetchWishes();
            }
        };

        fetchList();

        supabase
            .channel('schema-db-changes')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'list',
                    filter: `id=eq.${params?.id}`,
                },
                () => {
                    console.log('UPDATED!');
                    fetchWishes();
                }
            )
            .subscribe();
    }, [supabase]);

    useEffect(() => {
        if (wishToEdit) {
            // @ts-ignore
            document.getElementById('edit_wish_modal')?.showModal();
        }
    }, [wishToEdit]);

    if (isLoading) {
        return (
            <div className='animate-in flex max-w-4xl flex-1 flex-col items-start justify-center gap-20 px-3 opacity-0'>
                <span className='loading loading-spinner loading-lg'></span>
            </div>
        );
    }

    return (
        <div className='animate-in flex max-w-4xl flex-1 flex-col gap-20 px-3 opacity-0'>
            <main className='flex max-w-[500px] flex-1 flex-col items-start justify-center gap-6 py-12'>
                <div className='flex w-full items-center justify-center gap-6'>
                    <b className='text-2xl'>{list?.name}</b>
                    {userId === list?.user_id && (
                        <button
                            className='btn btn-primary'
                            //@ts-ignore
                            onClick={() => document.getElementById('create_wish_modal')?.showModal()}
                        >
                            Add new wish
                        </button>
                    )}
                </div>
                {wishes.map((wish) => {
                    return <Wish key={wish.id} {...wish} onEditClick={setWishToEdit} />;
                })}

                <CreateWishModal listId={params.id} />

                <EditWishModal {...wishToEdit} listId={params.id} onClose={() => setWishToEdit(null)} />
            </main>
        </div>
    );
}
