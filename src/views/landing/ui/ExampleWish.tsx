'use client';

import { Wish } from '@/src/shared/api/models';
import { useState } from 'react';

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
                <span className='label-text ml-4 text-color-theme'>{label} </span>
            </label>
        </div>
    );
};
