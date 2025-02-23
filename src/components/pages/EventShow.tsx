import React, { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Avatar, Card, Center, Container, DataList, Heading, HStack, Link, Spinner, Stack, Tag, Text } from '@chakra-ui/react';
import { Tooltip } from '@/components/ui/tooltip';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { SecondaryButton } from '@/components/atoms/SecondaryButton';
import { DeleteDialog } from '@/components/blocks/DeleteDialog';
import { EventDetail } from '@/domains/eventDetail';
import { fetchEventDetail, deleteEvent } from '@/utils/supabaseFunctions';
import { useMessage } from '@/hooks/useMessage';
import defaultAvatar from '@/assets/defautAvatar.svg';

export const EventShow: React.FC = memo(() => {
  const navigate = useNavigate();
  const { user_id, event_id } = useParams();
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState<boolean>(false);
  const [event, setEvent] = useState<EventDetail>();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

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

  const onClickEditEvent = () => {
    navigate(`/${user_id}/events/${event_id}/edit`);
  };

  const onClickDeleteConfirm = () => {
    setOpenConfirm(true);
  };

  const onClickDelete = () => {
    if (!event_id) {
      showMessage({ title: '削除対象のデータが見つかりません', type: 'error' });
      setOpenConfirm(false);
      return;
    }

    const deleteEventFromEventId = async () => {
      try {
        setLoadingDelete(true);
        await deleteEvent(event_id);

        showMessage({ title: 'イベントの削除が完了しました', type: 'success' });
        navigate(`/${user_id}/events/hosted`);
      } catch {
        showMessage({ title: 'イベントの削除に失敗しました', type: 'error' });
      } finally {
        setLoadingDelete(false);
        setOpenConfirm(false);
      }
    };

    deleteEventFromEventId();
  };

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <>
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
                                <Avatar.Root size="xs" ids={{ root: profile.profile_id }}>
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
                        <HStack flexWrap="wrap">
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
                        <HStack flexWrap="wrap">
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
              <Card.Footer justifyContent="center">
                {event?.created_by === user_id && (
                  <>
                    <PrimaryButton onClick={onClickEditEvent}>編集</PrimaryButton>
                    <SecondaryButton onClick={onClickDeleteConfirm}>削除</SecondaryButton>
                  </>
                )}
              </Card.Footer>
            </Card.Root>
          </Container>
          <DeleteDialog openConfirm={openConfirm} setOpenConfirm={setOpenConfirm} loadingDelete={loadingDelete} onClickDelete={onClickDelete} />
        </>
      )}
    </>
  );
});
