import { useCallback, useEffect, useState } from 'react';

import { Database } from '@/lib/schema';
import { createClient } from '@/utils/supabase/client';
import { deleteWishById, updateList } from '@/utils/supabase/fetches';
import { generatePrimaryButtonStyles } from '@/lib/styles';

type Wish = Database['public']['Tables']['wish']['Row'];

export const DeleteIcon = ({ onClick }: { onClick: () => void }) => {
    return (
        <div className='flex cursor-pointer' onClick={onClick}>
            &#10060;
        </div>
    );
};

export const WishLink = ({ link }: { link: string }) => (
    <a href={link} target='_blank' className='text-blue hover:underline' rel='noreferrer'>
        <button className={generatePrimaryButtonStyles('btn-xs')}>link</button>
    </a>
);

export const Wish = ({ id, label, checked, list_id, link, isMyList }: Wish & { isMyList: boolean }) => {
    const supabase = createClient();
    const [checkedValue, setCheckedValue] = useState(checked);

    const updateWish = useCallback(async (isChecked: boolean) => {
        await supabase.from('wish').update({ checked: isChecked }).eq('id', id);
        await updateList(supabase, list_id);
        setCheckedValue(isChecked);
    }, []);

    const onDeleteClick = useCallback(async (id: string) => {
        await deleteWishById(supabase, id);
        await updateList(supabase, list_id);
    }, []);

    useEffect(() => {
        setCheckedValue(checked);
    }, [checked]);

    return (
        <div className='relative mx-2 flex flex-col px-2'>
            <div className={`flex items-center ${isMyList ? 'mr-6' : ''}`}>
                <label className='mobile:mx-2 label cursor-pointer'>
                    <div className='flex min-w-[30px]'>{checkedValue && <>&#127881;</>}</div>
                    <input
                        type='checkbox'
                        className='border-dark-grey checkbox [--chkbg:--checkbox-green] checked:border-[--checkbox-green]'
                        checked={checkedValue}
                        onChange={(e) => updateWish(e.target.checked)}
                    />
                    <span className='label-text ml-4'>{label} </span>
                </label>
                {isMyList && (
                    <div className='absolute right-2 top-2'>
                        <DeleteIcon onClick={() => onDeleteClick(id)} />
                    </div>
                )}
            </div>

            {link && (
                <div className='mobile:pl-4 mb-3 ml-16 pl-2 h-8'>
                    <WishLink link={link} />
                </div>
            )}
        </div>
    );
};
