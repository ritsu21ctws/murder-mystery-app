import React, { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button, Center, Container, Heading, HStack, Spinner, Stack, Table, Tag, Text } from '@chakra-ui/react';
import { FiFileText } from 'react-icons/fi';
import { UserCard } from '@/components/blocks/UserCard';
import { fetchUser } from '@/utils/supabaseFunctions';
import { Event } from '@/domains/event';
import { User } from '@/domains/user';
import { useMessage } from '@/hooks/useMessage';
import { fetchRecommendedEvents } from '@/utils/supabaseFunctions';

export const Mypage: React.FC = memo(() => {
  const navigate = useNavigate();
  const { user_id } = useParams();
  const { showMessage } = useMessage();

  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!user_id) {
      showMessage({ title: 'ユーザー情報の取得に失敗しました', type: 'error' });
      return;
    }

    const fetchUserData = async () => {
      try {
        setLoading(true);

        const user_data = await fetchUser(user_id);
        const event_data = await fetchRecommendedEvents(user_id);

        setUser(user_data);
        setEvents(event_data);
      } catch (error) {
        showMessage({ title: 'ユーザー情報の取得に失敗しました', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const onClickShowEvent = (event_id: string) => {
    navigate(`/${user_id}/events/${event_id}`);
  };

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Container my={{ base: '4', sm: '10' }} textAlign="center">
          <HStack align="start">
            {user && <UserCard userId={user.user_id} avatarUrl={user.profiles?.avatar_url} userName={user.profiles?.user_name} />}
            <Stack>
              <Heading textAlign="center" mb="4">
                おすすめイベント
              </Heading>
              <Table.Root
                size={{ base: 'sm', md: 'md' }}
                variant="outline"
                minW={{ base: 'auto', xl: '6xl' }}
                my={{ base: 5, md: 6 }}
                showColumnBorder
              >
                <Table.Header bg="primary">
                  <Table.Row>
                    <Table.ColumnHeader color="bg.primary" textAlign="center" width="20%">
                      イベント名
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color="bg.primary" textAlign="center" width="30%">
                      詳細
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color="bg.primary" textAlign="center" width="15%">
                      ジャンル
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color="bg.primary" textAlign="center" width="15%">
                      プレイスタイル
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color="bg.primary" textAlign="center" width="10%">
                      参加者数
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color="bg.primary" textAlign="center" width="10%"></Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body bg="white">
                  {events.map((event) => (
                    <Table.Row key={event.event_id}>
                      <Table.Cell textAlign="left">{event.name}</Table.Cell>
                      <Table.Cell textAlign="left">
                        <Text lineClamp="1">{event.detail}</Text>
                      </Table.Cell>
                      <Table.Cell textAlign="left">
                        <HStack flexWrap="wrap">
                          {event.genres.map((genre) => (
                            <Tag.Root key={genre.genre_id}>
                              <Tag.Label>{genre.name}</Tag.Label>
                            </Tag.Root>
                          ))}
                        </HStack>
                      </Table.Cell>
                      <Table.Cell textAlign="left">
                        <HStack flexWrap="wrap">
                          {event.play_styles.map((play_style) => (
                            <Tag.Root key={play_style.play_style_id}>
                              <Tag.Label>{play_style.name}</Tag.Label>
                            </Tag.Root>
                          ))}
                        </HStack>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        {event.profiles[0].count} / {event.max_user_num}
                      </Table.Cell>
                      <Table.Cell textAlign="end">
                        <HStack justifyContent="center">
                          <Button colorPalette="gray" variant="outline" onClick={() => onClickShowEvent(event.event_id)}>
                            <FiFileText />
                          </Button>
                        </HStack>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Stack>
          </HStack>
        </Container>
      )}
    </>
  );
});
