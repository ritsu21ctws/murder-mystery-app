import { Account } from '@/domains/account';
import { LoginFormData } from '@/domains/loginFormData';
import { EventFormData } from '@/domains/eventFormData';
import { Event } from '@/domains/event';
import { EventDetail } from '@/domains/eventDetail';
import { Genre } from '@/domains/genre';
import { PlayStyle } from '@/domains/playStyle';
import { ProfileFormData } from '@/domains/profileFormData';
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

  const { data } = await supabase.storage.from('avatars').getPublicUrl(filePath);
  console.log(data);

  return data.publicUrl;
};

export const createEvent = async (formData: EventFormData): Promise<void> => {
  const { error } = await supabase.rpc('insert_event', formData);

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const updateEvent = async (formData: EventFormData): Promise<void> => {
  const { name, detail, max_user_num, genres, play_styles, user_id, event_id } = formData;
  const { error } = await supabase.rpc('update_event', {
    p_name: name,
    p_detail: detail,
    p_max_user_num: max_user_num,
    p_genres: genres,
    p_play_styles: play_styles,
    p_user_id: user_id,
    p_event_id: event_id,
  });

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const fetchHostedEvents = async (user_id: string): Promise<Event[]> => {
  const { data, error } = await supabase
    .from('events')
    .select('event_id, name, max_user_num, detail, genres(genre_id, name), play_styles(play_style_id, name), profiles(count)')
    .eq('created_by', user_id)
    .returns<Event[]>();

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
};

export const fetchEventDetail = async (event_id: string): Promise<EventDetail> => {
  const { data, error } = await supabase
    .from('events')
    .select(
      'event_id, name, max_user_num, detail, created_by, genres(genre_id, name), play_styles(play_style_id, name), profiles(profile_id, user_name, avatar_url)'
    )
    .eq('event_id', event_id)
    .returns<EventDetail>()
    .single();

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
};

export const deleteEvent = async (event_id: string): Promise<void> => {
  const { error } = await supabase.from('events').delete().eq('event_id', event_id);

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
