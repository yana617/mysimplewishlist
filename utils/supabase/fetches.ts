import { SupabaseClient } from '@supabase/supabase-js';

type Supabase = SupabaseClient<any, 'public', any>;

export const updateList = async (supabase: Supabase, listId: string) => {
    await supabase.from('list').update({ updated_at: new Date().toISOString() }).eq('id', listId);
};

export const getListById = async (supabase: Supabase, listId: string) => {
    return supabase.from('list').select('id, name, user_id').eq('id', listId).single();
};

export const getWishesByListId = async (supabase: Supabase, listId: string) => {
    return supabase
        .from('wish')
        .select('id, label, checked, list_id, link')
        .order('label')
        .eq('list_id', listId);
};

export const deleteWishById = async (supabase: Supabase, id: string) => {
    await supabase.from('wish').delete().eq('id', id);
};

export const getListsByUserId = async (supabase: Supabase, userId: string) => {
    return supabase.from('list').select('id, name, user_id, created_at').eq('user_id', userId);
};

export const insertList = async (supabase: Supabase, listName: string, userId: string) => {
    return supabase.from('list').insert({ name: listName, user_id: userId });
}