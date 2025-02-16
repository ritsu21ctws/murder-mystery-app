import React, { memo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';
import { Box, Flex } from '@chakra-ui/react';
import { Footer } from '@/components/layouts/Footer';
import { Header } from '@/components/layouts/Header';
import { SpMenu } from '@/components/layouts/SpMenu';

export const Layout: React.FC = memo(() => {
  const navigate = useNavigate();
  const { user_id } = useParams();

  const onClickMypage = () => navigate(`/${user_id}/mypage`);
  const onClickHostedEvents = () => navigate(`/${user_id}/events/hosted`);
  const onClickJoinedEvents = () => navigate(`/${user_id}/events/joined`);

  return (
    <Box minH="100vh">
      {/* ヘッダー */}
      <Header onClickMypage={onClickMypage} onClickHostedEvents={onClickHostedEvents} onClickJoinedEvents={onClickJoinedEvents} />

      {/* コンテンツ */}
      <Outlet />

      {/* スマホ用メニュー */}
      <SpMenu onClickMypage={onClickMypage} onClickHostedEvents={onClickHostedEvents} onClickJoinedEvents={onClickJoinedEvents} />
      {/* フッター */}
      <Footer />
    </Box>
  );
});
