import React, { memo } from 'react';
import { Box, Flex, Image, Link } from '@chakra-ui/react';
import logo from '@/assets/logo.svg';

type HeaderProps = {
  onClickMypage: () => void;
  onClickHostedEvents: () => void;
  onClickJoinedEvents: () => void;
};

export const Header: React.FC<HeaderProps> = memo((props) => {
  const { onClickMypage, onClickHostedEvents, onClickJoinedEvents } = props;

  return (
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
  );
});
