import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Center, Container, HStack, Spinner } from '@chakra-ui/react';
import { UserCard } from '@/components/blocks/UserCard';
import { fetchUser, getAvatarUrl } from '@/utils/supabaseFunctions';
import { User } from '@/domains/user';
import { useMessage } from '@/hooks/useMessage';

export const Mypage: React.FC = memo(() => {
  const { user_id } = useParams();
  const { showMessage } = useMessage();

  const [user, setUser] = useState<User>();
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!user_id) {
      showMessage({ title: 'ユーザー情報の取得に失敗しました', type: 'error' });
      return;
    }

    const fetchUserData = async () => {
      try {
        setLoading(true);

        const data = await fetchUser(user_id);
        const avatarUrl = await getAvatarUrl(data.profiles.avatar_url);

        setUser(data);
        setAvatarUrl(avatarUrl);
      } catch (error) {
        showMessage({ title: 'ユーザー情報の取得に失敗しました', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Container my={{ base: '4', sm: '10' }} textAlign="center">
          <HStack align="start">
            {user && <UserCard userId={user.user_id} avatarUrl={avatarUrl} userName={user.profiles.user_name} />}
            {/* Todo:おすすめイベント */}
          </HStack>
        </Container>
      )}
    </>
  );
});
