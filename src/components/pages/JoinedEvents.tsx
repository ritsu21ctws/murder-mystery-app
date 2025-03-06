import React, { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button, Center, Container, Heading, HStack, Spinner, Table, Tag, Text, Flex } from '@chakra-ui/react';
import { FiFileText } from 'react-icons/fi';
import { Event } from '@/domains/event';
import { useMessage } from '@/hooks/useMessage';
import { fetchJoinedEvents } from '@/utils/supabaseFunctions';

export const JoinedEvents: React.FC = memo(() => {
  const navigate = useNavigate();
  const { user_id } = useParams();
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState<boolean>(false);
  const [joinedEvents, setJoinedEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!user_id) {
      showMessage({ title: 'ユーザー情報の取得に失敗しました', type: 'error' });
      return;
    }

    const fetchHostedEventsFromUserId = async () => {
      try {
        setLoading(true);

        const data = await fetchJoinedEvents(user_id);

        setJoinedEvents(data);
      } catch (error) {
        showMessage({ title: 'イベント情報の取得に失敗しました', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchHostedEventsFromUserId();
  }, []);

  const onClickShowEvent = (event_id: string) => {
    navigate(`../${event_id}`);
  };

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Container my={{ base: '5', sm: '10' }} centerContent>
          <Flex direction="column" align="center">
            <Heading textAlign="center" mb="4">
              参加イベント
            </Heading>
            <Table.Root size={{ base: 'sm', md: 'md' }} variant="outline" minW={{ base: 'auto', xl: '6xl' }} my={{ base: 5, md: 6 }} showColumnBorder>
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
                {joinedEvents.map((joinedEvent) => (
                  <Table.Row key={joinedEvent.event_id}>
                    <Table.Cell textAlign="left">{joinedEvent.name}</Table.Cell>
                    <Table.Cell textAlign="left">
                      <Text lineClamp="1">{joinedEvent.detail}</Text>
                    </Table.Cell>
                    <Table.Cell textAlign="left">
                      <HStack flexWrap="wrap">
                        {joinedEvent.genres.map((genre) => (
                          <Tag.Root key={genre.genre_id}>
                            <Tag.Label>{genre.name}</Tag.Label>
                          </Tag.Root>
                        ))}
                      </HStack>
                    </Table.Cell>
                    <Table.Cell textAlign="left">
                      <HStack flexWrap="wrap">
                        {joinedEvent.play_styles.map((play_style) => (
                          <Tag.Root key={play_style.play_style_id}>
                            <Tag.Label>{play_style.name}</Tag.Label>
                          </Tag.Root>
                        ))}
                      </HStack>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {joinedEvent.profiles[0].count} / {joinedEvent.max_user_num}
                    </Table.Cell>
                    <Table.Cell textAlign="end">
                      <HStack justifyContent="right">
                        <Button colorPalette="gray" variant="outline" onClick={() => onClickShowEvent(joinedEvent.event_id)}>
                          <FiFileText />
                        </Button>
                      </HStack>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Flex>
        </Container>
      )}
    </>
  );
});
