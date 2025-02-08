export class ProfileFormData {
  constructor(
    public profile_id: string,
    public user_name: string,
    public avatar_url: string,
    public introduction: string,
    public genres: string[],
    public play_styles: string[]
  ) {}
}
