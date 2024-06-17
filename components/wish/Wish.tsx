import { useEffect, useState } from 'react';

import { Database } from '@/lib/schema';
import { createClient } from '@/utils/supabase/client';
import { updateList } from '@/utils/supabase/fetches';
import { WishFormValues } from './WishForm';

type Wish = Database['public']['Tables']['wish']['Row'];

type WishProps = Wish & { onEditClick: (values: { id: string } & WishFormValues) => void };

export const Wish = ({ id, label, checked, list_id, link, onEditClick }: WishProps) => {
    const supabase = createClient();
    const [checkedValue, setCheckedValue] = useState(checked);

    const updateWish = async (isChecked: boolean) => {
        await supabase.from('wish').update({ checked: isChecked }).eq('id', id);
        await updateList(supabase, list_id);
        setCheckedValue(isChecked);
    };

    useEffect(() => {
        setCheckedValue(checked);
    }, [checked]);

    return (
        <div className='form-control'>
            <label className='label -ml-[30px] cursor-pointer'>
                <div className='flex min-w-[30px]'>{checkedValue && <>&#127881;</>}</div>
                <input
                    type='checkbox'
                    className='checkbox border-[red] [--chkbg:--checkbox-green] checked:border-[--checkbox-green]'
                    checked={checkedValue}
                    onChange={(e) => updateWish(e.target.checked)}
                />
                <div
                    className='flex min-w-[30px] pl-4'
                    onClick={() => onEditClick({ id, label, link })}
                >
                    &#128396;
                </div>
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
