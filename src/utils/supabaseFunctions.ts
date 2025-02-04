import { RegisterFormData } from '@/domains/registerFormData';
import { supabase } from './supabase';

export const createAccount = async (formData: RegisterFormData): Promise<void> => {
  const { error } = await supabase.rpc('create_account', formData);

  if (error) {
    throw new Error(error.message);
  }
};
