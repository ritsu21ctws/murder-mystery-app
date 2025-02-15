import { Account } from '@/domains/account';
import { LoginFormData } from '@/domains/loginFormData';
import { RegisterFormData } from '@/domains/registerFormData';
import { Genre } from '@/domains/genre';
import { PlayStyle } from '@/domains/playStyle';
import { ProfileFormData } from '@/domains/profileFormData';
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

export const fetchUserDetail = async (user_id: string): Promise<User> => {
  const { data, error } = await supabase
    .from('accounts')
    .select('user_id, profiles(profile_id, user_name, avatar_url, introduction), genres(genre_id, name), play_styles(play_style_id, name)')
    .eq('user_id', user_id)
    .returns<User>()
    .single();

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
};

export const fetchGenres = async (): Promise<Array<Genre>> => {
  const { data, error } = await supabase.from('genres').select('genre_id, name');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const fetchPlayStyles = async (): Promise<Array<PlayStyle>> => {
  const { data, error } = await supabase.from('play_styles').select('play_style_id, name');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateProfile = async (user_id: string, formData: ProfileFormData): Promise<void> => {
  const { profile_id, user_name, avatar_url, introduction, genres, play_styles } = formData;
  const { error } = await supabase.rpc('update_profile', {
    p_user_id: user_id,
    p_profile_id: profile_id,
    p_user_name: user_name,
    p_avatar_url: avatar_url,
    p_introduction: introduction,
    p_genres: genres,
    p_play_styles: play_styles,
  });

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const uploadAvatar = async (userId: string, uploadFile: File): Promise<string> => {
  const file = uploadFile;
  const fileExt = file.name.split('.').pop();
  const filePath = `${userId}/${Math.random()}.${fileExt}`;

  const { error } = await supabase.storage.from('avatars').upload(filePath, file);

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return filePath;
};

export const getAvatarUrl = async (avatar_url: string | undefined): Promise<string | undefined> => {
  if (!avatar_url) return undefined;

  const { data, error } = await supabase.storage.from('avatars').createSignedUrl(avatar_url, 600);
  const avatarUrl = data?.signedUrl;

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return avatarUrl;
};
