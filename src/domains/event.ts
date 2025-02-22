import { Genre } from '@/domains/genre';
import { PlayStyle } from '@/domains/playStyle';

export class Event {
  constructor(
    public event_id: string,
    public name: string,
    public max_user_num: number,
    public detail: string,
    public genres: Genre[],
    public play_styles: PlayStyle[],
    public profiles: [{ count: number }]
  ) {}
}
