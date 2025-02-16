import React, { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import {
  Center,
  Container,
  Field,
  Heading,
  Input,
  Spinner,
  Stack,
  Textarea,
  VisuallyHidden,
  createListCollection,
  ListCollection,
} from '@chakra-ui/react';
import { NumberInputField, NumberInputRoot } from '@/components/ui/number-input';
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from '@/components/ui/select';
import { SecondaryButton } from '@/components/atoms/SecondaryButton';
import { EventFormData } from '@/domains/eventFormData';
import { createEvent, fetchGenres, fetchPlayStyles } from '@/utils/supabaseFunctions';
import { useMessage } from '@/hooks/useMessage';

export const EventCreate: React.FC = memo(() => {
  const navigate = useNavigate();
  const { user_id } = useParams();
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingCreate, setLoadingCreate] = useState<boolean>(false);
  const [genres, setGenres] = useState<ListCollection<{ label: string; value: string }>>();
  const [playStyles, setPlayStyles] = useState<ListCollection<{ label: string; value: string }>>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>({
    defaultValues: {
      name: '',
      max_user_num: '',
      detail: '',
      genres: [],
      play_styles: [],
      user_id: user_id || '',
    },
  });

  useEffect(() => {
    if (!user_id) {
      showMessage({ title: 'ユーザー情報の取得に失敗しました', type: 'error' });
      return;
    }

    const getSelectOptions = async () => {
      try {
        setLoading(true);

        const genres = await fetchGenres();
        const playStyles = await fetchPlayStyles();

        // セレクトボックスの選択肢をセット
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

  const onSubmitEventCreate = handleSubmit((data: EventFormData) => {
    const createEventFromFormData = async () => {
      try {
        setLoadingCreate(true);

        await createEvent(data);

        showMessage({ title: 'イベントの作成に成功しました', type: 'success' });
        navigate(`/${user_id}/events/hosted`);
      } catch {
        showMessage({ title: 'イベントの作成に失敗しました', type: 'error' });
      } finally {
        setLoadingCreate(false);
      }
    };

    createEventFromFormData();
  });

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Container my={{ base: '5', sm: '10' }}>
          <Center>
            <Stack gap={{ base: '5', sm: '7' }} width="md">
              <Heading textAlign="center">イベント作成</Heading>
              <form onSubmit={onSubmitEventCreate}>
                <Stack gap="6">
                  <Field.Root invalid={!!errors.name}>
                    <Field.Label>イベント名 *</Field.Label>
                    <Controller
                      name="name"
                      control={control}
                      rules={{
                        required: 'イベント名の入力は必須です',
                      }}
                      render={({ field }) => <Input {...field} bg="white" />}
                    />
                    <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.max_user_num}>
                    <Field.Label>募集人数 *</Field.Label>
                    <Controller
                      name="max_user_num"
                      control={control}
                      rules={{
                        required: '募集人数の入力は必須です',
                        min: { value: 0, message: '募集人数は0以上である必要があります' },
                      }}
                      render={({ field }) => (
                        <NumberInputRoot
                          width="100%"
                          bg="white"
                          name={field.name}
                          value={field.value}
                          onValueChange={({ value }) => field.onChange(value)}
                        >
                          <NumberInputField />
                        </NumberInputRoot>
                      )}
                    />
                    <Field.ErrorText>{errors.max_user_num?.message}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.detail}>
                    <Field.Label>詳細</Field.Label>
                    <Controller name="detail" control={control} render={({ field }) => <Textarea {...field} bg="white" />} />
                    <Field.ErrorText>{errors.detail?.message}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.genres}>
                    <Field.Label>ジャンル</Field.Label>
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
                      <Controller name="user_id" control={control} render={({ field }) => <Input {...field} />} />
                    </Field.Root>
                  </VisuallyHidden>
                  <SecondaryButton loading={loadingCreate}>作成する</SecondaryButton>
                </Stack>
              </form>
            </Stack>
          </Center>
        </Container>
      )}
    </>
  );
});
