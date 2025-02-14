import React, { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import {
  Avatar,
  Button,
  Center,
  Container,
  Field,
  Heading,
  Input,
  HStack,
  Spinner,
  Stack,
  Textarea,
  VisuallyHidden,
  createListCollection,
  ListCollection,
} from '@chakra-ui/react';
import { FileUploadList, FileUploadRoot, FileUploadTrigger } from '@/components/ui/file-upload';
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from '@/components/ui/select';
import { HiUpload } from 'react-icons/hi';
import { SecondaryButton } from '@/components/atoms/SecondaryButton';
import defaultAvatar from '@/assets/defautAvatar.svg';
import { ProfileFormData } from '@/domains/profileFormData';
import { User } from '@/domains/user';
import { fetchUserDetail, fetchGenres, fetchPlayStyles, updateProfile, uploadAvatar, getAvatarUrl } from '@/utils/supabaseFunctions';
import { useMessage } from '@/hooks/useMessage';

export const ProfileEdit: React.FC = memo(() => {
  const navigate = useNavigate();
  const { user_id } = useParams();
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingUpload, setLoadingUpload] = useState<boolean>(false);
  const [userDetail, setUserDetail] = useState<User>();
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [genres, setGenres] = useState<ListCollection<{ label: string; value: string }>>();
  const [playStyles, setPlayStyles] = useState<ListCollection<{ label: string; value: string }>>();
  const [newAvatar, setNewAvatar] = useState<File | null>(null);

  useEffect(() => {
    if (!user_id) {
      showMessage({ title: 'ユーザー情報の取得に失敗しました', type: 'error' });
      return;
    }

    const getUserDetailWithSelectOptions = async (user_id: string) => {
      try {
        setLoading(true);

        const userDetail = await fetchUserDetail(user_id);
        const avatarUrl = await getAvatarUrl(userDetail.profiles.avatar_url);

        const genres = await fetchGenres();
        const playStyles = await fetchPlayStyles();

        // ユーザー情報をセット
        setUserDetail(userDetail);
        setAvatarUrl(avatarUrl);

        // セレクトボックスの選択肢をセット
        setGenres(createListCollection({ items: genres.map((genre) => ({ label: genre.name, value: genre.genre_id })) }));
        setPlayStyles(createListCollection({ items: playStyles.map((playStyle) => ({ label: playStyle.name, value: playStyle.play_style_id })) }));

        // フォームにDBからの値をセット
        setValue('user_name', userDetail?.profiles.user_name);
        setValue('introduction', userDetail?.profiles.introduction || '');
        setValue('profile_id', userDetail?.profiles.profile_id);
        setValue('genres', Array.isArray(userDetail?.genres) ? userDetail.genres.map((obj) => obj.genre_id) : []);
        setValue('play_styles', Array.isArray(userDetail?.play_styles) ? userDetail.play_styles.map((obj) => obj.play_style_id) : []);
      } catch {
        showMessage({ title: 'データの取得に失敗しました', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    getUserDetailWithSelectOptions(user_id);
  }, []);

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      user_name: '',
      avatar_url: '',
      introduction: '',
      genres: [],
      play_styles: [],
    },
  });

  const onSubmitProileEdit = handleSubmit((data: ProfileFormData) => {
    console.log(data);
    if (!user_id) {
      showMessage({ title: 'ユーザー情報の取得に失敗しました', type: 'error' });
      return;
    }

    const updateProfileFromFormData = async () => {
      try {
        setLoadingUpload(true);

        data.avatar_url = userDetail?.profiles.avatar_url;
        if (newAvatar) {
          data.avatar_url = await uploadAvatar(user_id, newAvatar);
        }
        await updateProfile(user_id, data);

        showMessage({ title: 'プロフィールの更新が完了しました', type: 'success' });
        navigate(`/${user_id}/mypage`);
      } catch {
        showMessage({ title: 'プロフィールの更新に失敗しました', type: 'error' });
      } finally {
        setLoadingUpload(false);
      }
    };

    updateProfileFromFormData();
  });

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Container mt={{ base: '5', sm: '10' }}>
          <Center>
            <Stack gap={{ base: '5', sm: '7' }} width="md">
              <Heading textAlign="center">プロフィール編集</Heading>
              <form onSubmit={onSubmitProileEdit}>
                <Stack gap="6">
                  <HStack>
                    <Avatar.Root size="2xl" mr="3">
                      {avatarUrl ? <Avatar.Image src={avatarUrl} /> : <Avatar.Image src={defaultAvatar} />}
                    </Avatar.Root>
                    <Field.Root invalid={!!errors.custom_errors}>
                      <Controller
                        name="avatar_url"
                        control={control}
                        render={({ field }) => (
                          <FileUploadRoot
                            name={field.name}
                            accept={['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml']}
                            maxFileSize={2000000}
                            onFileChange={(e) => {
                              // ファイルアップロード成功時
                              if (e.acceptedFiles.length > 0) {
                                clearErrors('custom_errors');
                                setAvatarUrl(URL.createObjectURL(e.acceptedFiles[0]));
                                setNewAvatar(e.acceptedFiles[0]);
                              }
                              // ファイルアップロード失敗時
                              if (e.rejectedFiles.length > 0) {
                                setError('custom_errors', {
                                  types: {
                                    maxSize: e.rejectedFiles[0]?.errors.includes('FILE_TOO_LARGE')
                                      ? 'アップロードファイルのサイズが2MBを超えています。'
                                      : '',
                                    invalidType: e.rejectedFiles[0]?.errors.includes('FILE_INVALID_TYPE')
                                      ? 'アップロードファイルは.jpg、.jpeg、.png、.svgのいずれかの形式である必要があります。'
                                      : '',
                                  },
                                });
                              }
                            }}
                          >
                            <FileUploadTrigger asChild>
                              <Button variant="outline" size="sm" bg="gray.200" _hover={{ opacity: 0.8 }}>
                                <HiUpload /> 画像のアップロード
                              </Button>
                            </FileUploadTrigger>
                            <FileUploadList showSize clearable />
                          </FileUploadRoot>
                        )}
                      />
                      <Field.ErrorText>
                        {errors.custom_errors?.types?.maxSize}
                        {errors.custom_errors?.types?.maxSize && <br />}
                        {errors.custom_errors?.types?.invalidType}
                      </Field.ErrorText>
                    </Field.Root>
                  </HStack>
                  <Field.Root invalid={!!errors.user_name}>
                    <Field.Label>ユーザー名 *</Field.Label>
                    <Controller
                      name="user_name"
                      control={control}
                      rules={{
                        required: 'ユーザー名の入力は必須です',
                      }}
                      render={({ field }) => <Input {...field} bg="white" />}
                    />
                    <Field.ErrorText>{errors.user_name?.message}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.introduction}>
                    <Field.Label>自己紹介</Field.Label>
                    <Controller name="introduction" control={control} render={({ field }) => <Textarea {...field} bg="white" />} />
                    <Field.ErrorText>{errors.introduction?.message}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.genres}>
                    <Field.Label>好きなジャンル</Field.Label>
                    <Controller
                      name="genres"
                      control={control}
                      render={({ field }) => (
                        <SelectRoot
                          name={field.name}
                          value={field.value}
                          onValueChange={({ value }) => field.onChange(value)}
                          onInteractOutside={() => field.onBlur()}
                          multiple
                          collection={genres || createListCollection({ items: [] })}
                        >
                          <SelectTrigger bg="white">
                            <SelectValueText placeholder="Select Option" />
                          </SelectTrigger>
                          <SelectContent>
                            {genres?.items.map((genre) => (
                              <SelectItem item={genre} key={genre.value}>
                                {genre.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </SelectRoot>
                      )}
                    />
                    <Field.ErrorText>{errors.genres?.message}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.play_styles}>
                    <Field.Label>プレイスタイル</Field.Label>
                    <Controller
                      name="play_styles"
                      control={control}
                      render={({ field }) => (
                        <SelectRoot
                          name={field.name}
                          value={field.value}
                          onValueChange={({ value }) => field.onChange(value)}
                          onInteractOutside={() => field.onBlur()}
                          multiple
                          collection={playStyles || createListCollection({ items: [] })}
                        >
                          <SelectTrigger bg="white">
                            <SelectValueText placeholder="Select Option" />
                          </SelectTrigger>
                          <SelectContent>
                            {playStyles?.items.map((playStyle) => (
                              <SelectItem item={playStyle} key={playStyle.value}>
                                {playStyle.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </SelectRoot>
                      )}
                    />
                    <Field.ErrorText>{errors.play_styles?.message}</Field.ErrorText>
                  </Field.Root>
                  <VisuallyHidden asChild>
                    <Field.Root>
                      <Controller name="profile_id" control={control} render={({ field }) => <Input {...field} />} />
                    </Field.Root>
                  </VisuallyHidden>
                  <SecondaryButton loading={loadingUpload}>更新する</SecondaryButton>
                </Stack>
              </form>
            </Stack>
          </Center>
        </Container>
      )}
    </>
  );
});
