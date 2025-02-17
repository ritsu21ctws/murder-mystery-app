import React, { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button, Center, Container, Heading, HStack, Spinner, Table, Text, Flex } from '@chakra-ui/react';
import { FiEdit, FiFileText } from 'react-icons/fi';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { Event } from '@/domains/event';
import { useMessage } from '@/hooks/useMessage';
import { fetchHostedEvents } from '@/utils/supabaseFunctions';

export const HostedEvents: React.FC = memo(() => {
  const navigate = useNavigate();
  const { user_id } = useParams();
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState<boolean>(false);
  const [hostedEvents, setHostedEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!user_id) {
      showMessage({ title: 'ユーザー情報の取得に失敗しました', type: 'error' });
      return;
    }

    const fetchHostedEventsFromUserId = async () => {
      try {
        setLoading(true);

        const data = await fetchHostedEvents(user_id);

        setHostedEvents(data);
      } catch (error) {
        showMessage({ title: 'イベント情報の取得に失敗しました', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchHostedEventsFromUserId();
  }, []);

  const onClickCreateEvent = () => {
    navigate(`../create`);
  };

  const onClickShowEvent = (event_id: string) => {
    navigate(`../${event_id}`);
  };

  const onClickEditEvent = (event_id: string) => {
    navigate(`../${event_id}/edit`);
  };

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Container my={{ base: '5', sm: '10' }}>
          <Center>
            <Flex direction="column" align="center">
              <Heading textAlign="center" mb="4">
                主催イベント
              </Heading>
              <PrimaryButton onClick={onClickCreateEvent}>イベント作成</PrimaryButton>
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
                  {hostedEvents.map((hostedEvent) => (
                    <Table.Row key={hostedEvent.event_id}>
                      <Table.Cell textAlign="left">{hostedEvent.name}</Table.Cell>
                      <Table.Cell textAlign="left">
                        <Text lineClamp="1">{hostedEvent.detail}</Text>
                      </Table.Cell>
                      <Table.Cell textAlign="left">{hostedEvent.genres.map((genre) => genre.name).join(', ')}</Table.Cell>
                      <Table.Cell textAlign="left">{hostedEvent.play_styles.map((play_style) => play_style.name).join(', ')}</Table.Cell>
                      <Table.Cell textAlign="center">
                        {hostedEvent.profiles[0].count} / {hostedEvent.max_user_num}
                      </Table.Cell>
                      <Table.Cell textAlign="end">
                        <HStack justifyContent="right">
                          <Button colorPalette="gray" variant="outline" onClick={() => onClickShowEvent(hostedEvent.event_id)}>
                            <FiFileText />
                          </Button>
                          <Button colorPalette="gray" variant="outline" onClick={() => onClickEditEvent(hostedEvent.event_id)}>
                            <FiEdit />
                          </Button>
                        </HStack>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Flex>
          </Center>
        </Container>
      )}
    </>
  );
});
