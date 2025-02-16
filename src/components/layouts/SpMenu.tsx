import React, { memo } from 'react';
import { Flex, IconButton } from '@chakra-ui/react';
import { FaCalendarCheck, FaHome, FaUsers } from 'react-icons/fa';

type SpMenuProps = {
  onClickMypage: () => void;
  onClickHostedEvents: () => void;
  onClickJoinedEvents: () => void;
};

export const SpMenu: React.FC<SpMenuProps> = memo((props) => {
  const { onClickMypage, onClickHostedEvents, onClickJoinedEvents } = props;

  return (
    <Flex
      as="nav"
      bg="primary"
      display={{ base: 'flex', sm: 'none' }}
      py={1}
      pos={{ base: 'fixed', sm: 'static' }}
      bottom={0}
      left={0}
      right={0}
      zIndex={100}
      align="center"
      justify="space-around"
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
  );
});
