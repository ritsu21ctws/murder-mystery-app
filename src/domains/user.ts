import { Genre } from '@/domains/genre';
import { PlayStyle } from '@/domains/playStyle';
import { Profile } from '@/domains/profile';

export class User {
  constructor(
    public user_id: string,
    public profiles: Profile,
    public genres?: Genre,
    public play_styles?: PlayStyle
  ) {}
}
