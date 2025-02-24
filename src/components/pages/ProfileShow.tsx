import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Avatar, Card, Center, Container, DataList, Heading, HStack, Spinner, Stack, Tag } from '@chakra-ui/react';
import { Profile } from '@/domains/profile';
import { fetchProfile } from '@/utils/supabaseFunctions';
import { useMessage } from '@/hooks/useMessage';
import defaultAvatar from '@/assets/defautAvatar.svg';

export const ProfileShow: React.FC = memo(() => {
  const { user_id, profile_id } = useParams();
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    if (!user_id) {
      showMessage({ title: 'ユーザー情報の取得に失敗しました', type: 'error' });
      return;
    } else if (!profile_id) {
      showMessage({ title: 'プロフィール情報の取得に失敗しました', type: 'error' });
      return;
    }

    const fetchProfileFromProfileId = async () => {
      try {
        setLoading(true);

        const data = await fetchProfile(profile_id);
        console.log(data);

        setProfile(data);
      } catch (error) {
        showMessage({ title: 'ユーザー情報の取得に失敗しました', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchProfileFromProfileId();
  }, []);

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Container my={{ base: '5', sm: '10' }} centerContent>
          <Card.Root w="100%">
            <Card.Header>
              <Heading textAlign="center">プロフィール詳細</Heading>
            </Card.Header>
            <Card.Body>
              <Stack gap={{ base: '5', sm: '7' }}>
                <DataList.Root orientation={{ sm: 'horizontal' }} variant={{ base: 'bold', sm: 'subtle' }}>
                  <DataList.Item>
                    <DataList.ItemLabel>プロフィール画像</DataList.ItemLabel>
                    <DataList.ItemValue>
                      <Avatar.Root size="2xl" mr="3">
                        {profile?.avatar_url ? <Avatar.Image src={profile.avatar_url} /> : <Avatar.Image src={defaultAvatar} />}
                      </Avatar.Root>
                    </DataList.ItemValue>
                  </DataList.Item>
                  <DataList.Item pt="4">
                    <DataList.ItemLabel>ユーザー名</DataList.ItemLabel>
                    <DataList.ItemValue>{profile?.user_name}</DataList.ItemValue>
                  </DataList.Item>
                  <DataList.Item pt="4">
                    <DataList.ItemLabel>自己紹介</DataList.ItemLabel>
                    <DataList.ItemValue>{profile?.introduction}</DataList.ItemValue>
                  </DataList.Item>
                  <DataList.Item pt="4">
                    <DataList.ItemLabel>好きなジャンル</DataList.ItemLabel>
                    <DataList.ItemValue>
                      <HStack flexWrap="wrap">
                        {profile?.accounts?.genres?.map((genre) => (
                          <Tag.Root key={genre.genre_id}>
                            <Tag.Label>{genre.name}</Tag.Label>
                          </Tag.Root>
                        ))}
                      </HStack>
                    </DataList.ItemValue>
                  </DataList.Item>
                  <DataList.Item pt="4">
                    <DataList.ItemLabel>プレイスタイル</DataList.ItemLabel>
                    <DataList.ItemValue>
                      <HStack flexWrap="wrap">
                        {profile?.accounts?.play_styles?.map((play_style) => (
                          <Tag.Root key={play_style.play_style_id}>
                            <Tag.Label>{play_style.name}</Tag.Label>
                          </Tag.Root>
                        ))}
                      </HStack>
                    </DataList.ItemValue>
                  </DataList.Item>
                </DataList.Root>
              </Stack>
            </Card.Body>
            <Card.Footer justifyContent="center"></Card.Footer>
          </Card.Root>
        </Container>
      )}
    </>
  );
});
