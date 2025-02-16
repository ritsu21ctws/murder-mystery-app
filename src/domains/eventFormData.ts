export class EventFormData {
  constructor(
    public name: string,
    public detail: string,
    public max_user_num: string,
    public genres: string[],
    public play_styles: string[],
    public user_id: string
  ) {}
}
