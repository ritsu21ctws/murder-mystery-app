import React, { memo } from 'react';
import { Box, Text } from '@chakra-ui/react';

export const Footer: React.FC = memo(() => {
  return (
    <Box as="footer" bg="primary" display={{ base: 'none', sm: 'block' }} w="100%" py="3">
      {/* <Center> */}
      <Text textAlign="center" fontSize="xs" color="bg.primary">
        &copy; 2025 Mysteriam
      </Text>
      {/* </Center> */}
    </Box>
  );
});
