import React, { memo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';
import { Box, Flex, IconButton, Image, Link } from '@chakra-ui/react';
import logo from '@/assets/logo.svg';
import { FaCalendarCheck, FaHome, FaUsers } from 'react-icons/fa';

export const HeaderLayout: React.FC = memo(() => {
  const navigate = useNavigate();
  const { user_id } = useParams();

  const onClickMypage = () => navigate(`/${user_id}/mypage`);
  const onClickHostedEvents = () => navigate(`/${user_id}/events/hosted`);
  const onClickJoinedEvents = () => navigate(`/${user_id}/events/joined`);

  return (
    <>
      {/* ヘッダー */}
      <Flex as="nav" bg="primary" align="center" justify={{ base: 'center', sm: 'space-between' }} px={{ base: 3, sm: 5 }} py={{ base: 1, sm: 3 }}>
        <Flex align="center" mr={{ base: 0, sm: 8 }} onClick={onClickMypage}>
          <Link onClick={onClickMypage}>
            <Image src={logo} alt="MYSTERIAM logo" aspectRatio={3.5 / 1} w={{ base: 150, sm: 200 }} />
          </Link>
        </Flex>
        <Flex align="center" fontSize="sm" flexGrow={2} display={{ base: 'none', sm: 'flex' }}>
          <Box pr={4}>
            <Link color="bg.primary" onClick={onClickHostedEvents}>
              主催イベント
            </Link>
          </Box>
          <Link color="bg.primary" onClick={onClickJoinedEvents}>
            参加イベント
          </Link>
        </Flex>
      </Flex>
      {/* コンテンツ */}
      <Outlet />
      {/* スマホ用メニュー */}
      <Flex
        as="nav"
        bg="primary"
        display={{ base: 'flex', sm: 'none' }}
        pos={{ base: 'fixed', sm: 'static' }}
        bottom={0}
        left={0}
        right={0}
        zIndex={100}
        align="center"
        justify="space-around"
        py={1}
      >
        <IconButton color="accent" bg="primary" onClick={onClickMypage}>
          <FaHome />
        </IconButton>
        <IconButton color="accent" bg="primary" onClick={onClickHostedEvents}>
          <FaCalendarCheck />
        </IconButton>
        <IconButton color="accent" bg="primary" onClick={onClickJoinedEvents}>
          <FaUsers />
        </IconButton>
      </Flex>
    </>
  );
});
