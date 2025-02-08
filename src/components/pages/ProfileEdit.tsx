import React, { memo } from 'react';
import { Avatar, Button, Center, Container, Field, Heading, Input, HStack, Stack, Textarea, createListCollection } from '@chakra-ui/react';
import { FileUploadList, FileUploadRoot, FileUploadTrigger } from '@/components/ui/file-upload';
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from '@/components/ui/select';
import { HiUpload } from 'react-icons/hi';
import { SecondaryButton } from '@/components/atoms/SecondaryButton';
import defaultAvatar from '@/assets/defaut_avatar.svg';

export const ProfileEdit: React.FC = memo(() => {
  const genres = createListCollection({
    items: [
      { label: 'ファンタジー', value: '1' },
      { label: 'オンライン', value: '2' },
      { label: '学園もの', value: '3' },
      { label: '劇的', value: '4' },
      { label: '現代', value: '5' },
    ],
  });
  const playStyles = createListCollection({
    items: [
      { label: '推理重視', value: '1' },
      { label: 'ロールプレイ重視', value: '2' },
      { label: '初心者歓迎', value: '3' },
    ],
  });

  return (
    <>
      <Container mt={{ base: '5', sm: '10' }}>
        <Center>
          <Stack gap={{ base: '5', sm: '7' }} width="md">
            <Heading textAlign="center">プロフィール編集</Heading>
            <Stack gap="6">
              <HStack justify="space-between">
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
              <Field.Root>
                <Field.Label>ユーザー名 *</Field.Label>
                <Input bg="white" />
              </Field.Root>
              <Field.Root>
                <Field.Label>自己紹介</Field.Label>
                <Textarea bg="white" />
              </Field.Root>
              <SelectRoot collection={genres}>
                <SelectLabel>好きなジャンル</SelectLabel>
                <SelectTrigger bg="white">
                  <SelectValueText placeholder="Select Option" />
                </SelectTrigger>
                <SelectContent>
                  {genres.items.map((genre) => (
                    <SelectItem item={genre} key={genre.value}>
                      {genre.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
              <SelectRoot collection={playStyles} mb="3">
                <SelectLabel>プレイスタイル</SelectLabel>
                <SelectTrigger bg="white">
                  <SelectValueText placeholder="Select Option" />
                </SelectTrigger>
                <SelectContent>
                  {playStyles.items.map((playStyles) => (
                    <SelectItem item={playStyles} key={playStyles.value}>
                      {playStyles.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
              <SecondaryButton>更新する</SecondaryButton>
            </Stack>
          </Stack>
        </Center>
      </Container>
    </>
  );
});
