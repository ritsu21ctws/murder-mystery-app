import { User } from '@/domains/user';

export class Profile {
  constructor(
    public profile_id: string,
    public user_id: string,
    public user_name: string,
    public avatar_url?: string,
    public introduction?: string,
    public accounts?: User
  ) {}
}
