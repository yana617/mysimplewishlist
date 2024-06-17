import { SupabaseClient } from '@supabase/supabase-js';

export const updateList = async (supabase: SupabaseClient<any, 'public', any>, listId: string) => {
    await supabase.from('list').update({ updated_at: new Date().toISOString() }).eq('id', listId);
};
