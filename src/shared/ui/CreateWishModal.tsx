import { createClient } from '@/src/shared/api/client';
import { WishForm, WishFormValues } from './WishForm';
import { updateList } from '../api';

export const CreateWishModal = ({ listId }: { listId: string }) => {
    const supabase = createClient();

    const onSubmitHandler = async (values: WishFormValues) => {
        const { error } = await supabase
            .from('wish')
            .insert({ label: values.label, link: values.link, list_id: listId });

        if (!error) {
            //@ts-ignore
            document.getElementById('create_wish_modal')?.close();
            updateList(supabase, listId);
        }
    };

    return (
        <dialog id='create_wish_modal' className='modal'>
            <div className='modal-box w-[500px] mobile:w-[90%]'>
                <form method='dialog'>
                    <button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>✕</button>
                </form>

                <h3 className='text-lg font-bold'>New Wish</h3>

                <WishForm onSubmitHandler={onSubmitHandler} />
            </div>
            <form method='dialog' className='modal-backdrop'>
                <button>close</button>
            </form>
        </dialog>
    );
};
