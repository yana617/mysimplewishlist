import { useCallback, useEffect, useState } from 'react';

import { Database } from '@/lib/schema';
import { createClient } from '@/utils/supabase/client';
import { deleteWishById, updateList } from '@/utils/supabase/fetches';

type Wish = Database['public']['Tables']['wish']['Row'];

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
        <div className='flex items-center'>
            {isMyList && (
                <div className='flex min-w-[60px] cursor-pointer' onClick={() => onDeleteClick(id)}>
                    &#10060;
                </div>
            )}
            <label className='label -ml-[30px] cursor-pointer'>
                <div className='flex min-w-[30px]'>{checkedValue && <>&#127881;</>}</div>
                <input
                    type='checkbox'
                    className='checkbox border-[red] [--chkbg:--checkbox-green] checked:border-[--checkbox-green]'
                    checked={checkedValue}
                    onChange={(e) => updateWish(e.target.checked)}
                />
                <span className='label-text ml-4'>{label} </span>
                {link && (
                    <a
                        href={link}
                        target='_blank'
                        className='text-blue ml-2 font-bold hover:underline'
                        rel='noreferrer'
                    >
                        (ссылка)
                    </a>
                )}
            </label>
        </div>
    );
};
