import { Profile } from '@/domains/profile';

export class User {
  constructor(
    public user_id: string,
    public profiles: Profile
  ) {}
}
