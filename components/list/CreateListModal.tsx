import { FormEvent, useContext, useState } from 'react';

import { createClient } from '@/utils/supabase/client';
import { AuthContext } from '../AuthProvider';

export const CreateListModal = ({ reloadLists }: { reloadLists: () => void }) => {
    const supabase = createClient();
    const [name, setName] = useState('');
    const { userId } = useContext(AuthContext);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let listName = name.trim();

        if (listName.length && userId) {
            const { error } = await supabase.from('list').insert({ name: listName, user_id: userId });

            if (!error) {
                //@ts-ignore
                document.getElementById('create_wish_modal')?.close();
                reloadLists();
            }
        }
    };

    return (
        <dialog id='new_list_modal' className='modal'>
            <div className='modal-box w-[500px]'>
                <form method='dialog'>
                    <button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>✕</button>
                </form>
                <h3 className='text-lg font-bold'>New List</h3>
                <form className='flex flex-col gap-4 py-4' onSubmit={handleSubmit}>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type='text'
                        placeholder='Name'
                        className='input input-bordered w-full'
                    />
                    <p className='text-sm'>* You can edit/remove later</p>

                    <button className='bg-blue btn text-white' disabled={!name}>
                        Add new list
                    </button>
                </form>
            </div>
            <form method='dialog' className='modal-backdrop'>
                <button>close</button>
            </form>
        </dialog>
    );
};
