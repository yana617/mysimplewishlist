export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
    public: {
        Tables: {
            list: {
                Row: {
                    id: string;
                    created_at: string;
                    user_id: string;
                    name: string;
                };
                Insert: {
                    id?: string;
                    created_at?: string;
                    user_id: string;
                    name: string;
                };
                Update: {
                    id?: string;
                    created_at?: string;
                    user_id?: string;
                    name?: string;
                };
            };
            wish: {
                Row: {
                    id: string;
                    list_id: string;
                    label: string;
                    checked: boolean;
                    link: string;
                };
                Insert: {
                    id?: string;
                    list_id: string;
                    label: string;
                    checked?: boolean;
                    link?: string;
                };
                Update: {
                    id?: string;
                    list_id: string;
                    label?: string;
                    checked?: boolean;
                    link?: string;
                };
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}

export type List = Database['public']['Tables']['list']['Row'];
export type Wish = Database['public']['Tables']['wish']['Row'];
