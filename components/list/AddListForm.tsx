'use client';

import { useContext, useState } from 'react';

import { generatePrimaryButtonStyles, generateSecondaryButtonStyles } from '@/lib/styles';
import { insertList } from '@/utils/supabase/fetches';
import { createClient } from '@/utils/supabase/client';
import { AuthContext } from '../AuthProvider';
import { useRouter } from 'next/navigation';

export const AddListForm = () => {
    const supabase = createClient();
    const { userId } = useContext(AuthContext);
    const router = useRouter();

    const [newListName, setNewListName] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const onAddNewList = async () => {
        const { data: newList } = await insertList(supabase, newListName, userId!);
        router.push(`/home/${newList.id}`);
    };

    return (
        <>
            {isAdding && (
                <input
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    type='text'
                    placeholder='Enter a list name'
                    className='input input-bordered mt-2 h-[36px] w-full'
                />
            )}
            <div className='mt-4 flex w-full justify-between'>
                <button
                    className={generatePrimaryButtonStyles(isAdding ? 'w-[48%]' : 'w-full')}
                    onClick={() => {
                        if (!isAdding) {
                            setIsAdding(true);
                        } else {
                            onAddNewList();
                            setIsAdding(false);
                        }
                    }}
                >
                    {!isAdding ? '+ Add' : 'Save'}
                </button>
                {isAdding && (
                    <button
                        className={generateSecondaryButtonStyles('w-[48%]')}
                        onClick={() => {
                            setIsAdding(false);
                            setNewListName('');
                        }}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </>
    );
};
