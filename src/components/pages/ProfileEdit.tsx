import React, { memo, useEffect, useState } from 'react';
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
  createListCollection,
  ListCollection,
} from '@chakra-ui/react';
import { FileUploadList, FileUploadRoot, FileUploadTrigger } from '@/components/ui/file-upload';
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from '@/components/ui/select';
import { HiUpload } from 'react-icons/hi';
import { SecondaryButton } from '@/components/atoms/SecondaryButton';
import defaultAvatar from '@/assets/defaut_avatar.svg';
import { ProfileFormData } from '@/domains/profileFormData';
import { fetchGenres, fetchPlayStyles } from '@/utils/supabaseFunctions';
import { useMessage } from '@/hooks/useMessage';

export const ProfileEdit: React.FC = memo(() => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState<boolean>(false);
  const [genres, setGenres] = useState<ListCollection<{ label: string; value: string }>>();
  const [playStyles, setPlayStyles] = useState<ListCollection<{ label: string; value: string }>>();

  useEffect(() => {
    const getSelectOptions = async () => {
      try {
        setLoading(true);

        const genres = await fetchGenres();
        const playStyles = await fetchPlayStyles();

        setGenres(createListCollection({ items: genres.map((genre) => ({ label: genre.name, value: genre.genre_id })) }));
        setPlayStyles(createListCollection({ items: playStyles.map((playStyle) => ({ label: playStyle.name, value: playStyle.play_style_id })) }));
      } catch {
        showMessage({ title: 'データの取得に失敗しました', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    getSelectOptions();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      user_name: '',
      introduction: '',
      genres: [],
      play_styles: [],
    },
  });

  const onSubmitProileEdit = handleSubmit((data: ProfileFormData) => {
    console.log(data);
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
                      <Avatar.Image src={defaultAvatar} />
                    </Avatar.Root>
                    <FileUploadRoot>
                      <FileUploadTrigger asChild>
                        <Button variant="outline" size="sm" bg="gray.200" _hover={{ opacity: 0.8 }}>
                          <HiUpload /> 画像のアップロード
                        </Button>
                      </FileUploadTrigger>
                      <FileUploadList />
                    </FileUploadRoot>
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

                  <SecondaryButton>更新する</SecondaryButton>
                </Stack>
              </form>
            </Stack>
          </Center>
        </Container>
      )}
    </>
  );
});
