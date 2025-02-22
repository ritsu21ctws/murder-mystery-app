import React, { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Avatar, Card, Center, Container, DataList, Heading, HStack, Link, Spinner, Stack, Tag, Text } from '@chakra-ui/react';
import { Tooltip } from '@/components/ui/tooltip';
import { EventDetail } from '@/domains/eventDetail';
import { fetchEventDetail } from '@/utils/supabaseFunctions';
import { useMessage } from '@/hooks/useMessage';
import defaultAvatar from '@/assets/defautAvatar.svg';

export const EventShow: React.FC = memo(() => {
  const navigate = useNavigate();
  const { user_id, event_id } = useParams();
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState<boolean>(false);
  const [event, setEvent] = useState<EventDetail>();
  const [avatarUrls, setAvatarUrls] = useState<string[]>([]);

  useEffect(() => {
    if (!user_id) {
      showMessage({ title: 'ユーザー情報の取得に失敗しました', type: 'error' });
      return;
    } else if (!event_id) {
      showMessage({ title: 'イベント情報の取得に失敗しました', type: 'error' });
      return;
    }

    const fetchEventDetailFromEventId = async () => {
      try {
        setLoading(true);

        const data = await fetchEventDetail(event_id);
        data.profiles.forEach((profile) => {
          if (!profile.avatar_url) {
            setAvatarUrls([...avatarUrls, defaultAvatar]);
            return;
          }
        });
        console.log(data);

        setEvent(data);
      } catch (error) {
        showMessage({ title: 'イベント情報の取得に失敗しました', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetailFromEventId();
  }, []);

  const onClickShowProfile = (profile_id: string) => {
    navigate(`/${user_id}/profile/${profile_id}`);
  };

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
              <Heading textAlign="center">イベント詳細</Heading>
            </Card.Header>
            <Card.Body>
              <Stack gap={{ base: '5', sm: '7' }}>
                <DataList.Root orientation={{ sm: 'horizontal' }} variant={{ base: 'bold', sm: 'subtle' }}>
                  <DataList.Item>
                    <DataList.ItemLabel>イベント名</DataList.ItemLabel>
                    <DataList.ItemValue>{event?.name}</DataList.ItemValue>
                  </DataList.Item>
                  <DataList.Item pt="4">
                    <DataList.ItemLabel>募集人数</DataList.ItemLabel>
                    <DataList.ItemValue>{event?.max_user_num}</DataList.ItemValue>
                  </DataList.Item>
                  <DataList.Item pt="4">
                    <DataList.ItemLabel>詳細</DataList.ItemLabel>
                    <DataList.ItemValue>{event?.detail}</DataList.ItemValue>
                  </DataList.Item>
                  <DataList.Item pt="4">
                    <DataList.ItemLabel>参加者</DataList.ItemLabel>
                    <DataList.ItemValue>
                      <HStack>
                        <Text alignContent="center">{event?.profiles?.length ? `${event?.profiles?.length}：` : 0}</Text>
                        {event?.profiles?.map((profile) => (
                          <Link onClick={() => onClickShowProfile(profile.profile_id)} key={profile.profile_id}>
                            <Tooltip content={profile.user_name} ids={{ trigger: profile.profile_id }} openDelay={0} showArrow>
                              <Avatar.Root size="sm" ids={{ root: profile.profile_id }}>
                                {profile.avatar_url ? <Avatar.Image src={profile.avatar_url} /> : <Avatar.Image src={defaultAvatar} />}
                              </Avatar.Root>
                            </Tooltip>
                          </Link>
                        ))}
                      </HStack>
                    </DataList.ItemValue>
                  </DataList.Item>
                  <DataList.Item pt="4">
                    <DataList.ItemLabel>ジャンル</DataList.ItemLabel>
                    <DataList.ItemValue>
                      <HStack>
                        {event?.genres?.map((genre) => (
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
                      <HStack>
                        {event?.play_styles?.map((play_style) => (
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
            <Card.Footer />
          </Card.Root>
        </Container>
      )}
    </>
  );
});
