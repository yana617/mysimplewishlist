'use client';

import { useState } from 'react';

import { Database } from '@/lib/schema';

type Wish = Database['public']['Tables']['wish']['Row'];

export const ExampleWish = ({ label, checked }: Partial<Wish>) => {
    const [checkedValue, setCheckedValue] = useState(checked);

    return (
        <div className='flex items-center'>
            <label className='label cursor-pointer'>
                <div className='flex min-w-[30px]'>{checkedValue && <>&#127881;</>}</div>
                <input
                    type='checkbox'
                    className='checkbox border-dark-grey [--chkbg:--checkbox-green] checked:border-[--checkbox-green]'
                    checked={checkedValue}
                    onChange={(e) => setCheckedValue(e.target.checked)}
                />
                <span className='label-text ml-4'>{label} </span>
            </label>
        </div>
    );
};
