import { FormEvent, useState } from 'react';

export type WishFormValues = {
    label: string;
    link: string;
};

type WishFormProps = {
    onSubmitHandler: (values: WishFormValues) => void;
    initialValues?: Partial<WishFormValues>;
};

export const WishForm = ({ initialValues, onSubmitHandler }: WishFormProps) => {
    const [values, setValues] = useState({
        label: initialValues?.label || '',
        link: initialValues?.link || '',
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let wish = values.label.trim();

        if (wish.length) {
            onSubmitHandler(values);
        }

        setValues({ label: '', link: '' });
    };

    return (
        <form className='flex flex-col gap-4 py-4' onSubmit={handleSubmit}>
            <input
                value={values.label}
                onChange={(e) => setValues({ ...values, label: e.target.value })}
                type='text'
                placeholder='Wish'
                className='input input-bordered w-full'
            />

            <input
                value={values.link}
                onChange={(e) => setValues({ ...values, link: e.target.value })}
                type='text'
                placeholder='Link'
                className='input input-bordered w-full'
            />

            <p className='text-sm'>* You can edit/remove later</p>

            <button className='bg-blue btn text-white' disabled={!values.label}>
                Save
            </button>
        </form>
    );
};
