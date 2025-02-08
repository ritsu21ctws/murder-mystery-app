import { Account } from '@/domains/account';
import { LoginFormData } from '@/domains/loginFormData';
import { RegisterFormData } from '@/domains/registerFormData';
import { User } from '@/domains/user';
import { supabase } from './supabase';

export const createAccount = async (formData: RegisterFormData): Promise<void> => {
  const { error } = await supabase.rpc('create_account', formData);

  if (error) {
    throw new Error(error.message);
  }
};

export const fetchAccount = async (formData: LoginFormData): Promise<Account> => {
  const { data, error } = await supabase
    .from('accounts')
    .select('user_id, password')
    .eq('user_id', formData.user_id)
    .eq('password', formData.password)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const fetchUser = async (user_id: string): Promise<User> => {
  const { data, error } = await supabase
    .from('accounts')
    .select('user_id, profiles(user_name, avatar_url)')
    .eq('user_id', user_id)
    .returns<User>()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
