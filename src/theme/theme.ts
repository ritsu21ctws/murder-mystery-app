import { createSystem, defaultConfig } from '@chakra-ui/react';

const theme = createSystem(defaultConfig, {
  globalCss: {
    'html, body': {
      backgroundColor: 'gray.50',
    },
  },
});

export default theme;
