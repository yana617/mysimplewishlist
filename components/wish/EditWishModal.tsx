import { createClient } from '@/utils/supabase/client';
import { updateList } from '@/utils/supabase/fetches';
import { WishForm, WishFormValues } from './WishForm';

type EditWishModalProps = Partial<WishFormValues> & {
    id?: string;
    listId: string;
    onClose: () => void;
};

export const EditWishModal = ({ id, label, link, listId, onClose }: EditWishModalProps) => {
    const supabase = createClient();

    const onSubmitHandler = async (values: WishFormValues) => {
        const { error } = await supabase.from('wish').update(values).eq('id', id);

        if (!error) {
            //@ts-ignore
            document.getElementById('edit_wish_modal')?.close();
            updateList(supabase, listId);
        }
    };

    if (!id) {
        return null;
    } 

    return (
        <dialog id='edit_wish_modal' className='modal'>
            <div className='modal-box w-[500px]'>
                <form method='dialog'>
                    <button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>✕</button>
                </form>

                <h3 className='text-lg font-bold'>Edit Wish</h3>

                <WishForm onSubmitHandler={onSubmitHandler} initialValues={{ label, link }} />
            </div>
            <form method='dialog' className='modal-backdrop'>
                <button>close</button>
            </form>
        </dialog>
    );
};
