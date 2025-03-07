import React, { memo } from 'react';
import { useNavigate } from 'react-router';
import { Card, Image } from '@chakra-ui/react';
import { PrimaryButton } from '../atoms/PrimaryButton';
import defaultAvatar from '@/assets/defautAvatar.svg';

type Props = {
  userId: string;
  avatarUrl: string | undefined;
  userName: string | undefined;
};

export const UserCard: React.FC<Props> = memo((props) => {
  const { userId, avatarUrl, userName } = props;
  const navigate = useNavigate();

  const onClickEditPage = () => () => {
    navigate(`/${userId}/edit`);
  };

  return (
    <>
      <Card.Root minW="260px" maxW={{ base: '340px', sm: '260px' }} overflow="hidden" textAlign="center">
        <Card.Header>
          {avatarUrl ? (
            <Image borderRadius="full" boxSize="160px" src={avatarUrl} alt={`${userName}のプロフィール画像`} m="auto" />
          ) : (
            <Image borderRadius="full" boxSize="160px" src={defaultAvatar} alt={userName} m="auto" />
          )}
        </Card.Header>
        <Card.Body gap={2}>
          <Card.Title>{userName}</Card.Title>
          <Card.Description>@{userId}</Card.Description>
        </Card.Body>
        <Card.Footer>
          <PrimaryButton width="full" onClick={onClickEditPage()}>
            プロフィール編集
          </PrimaryButton>
        </Card.Footer>
      </Card.Root>
    </>
  );
});
