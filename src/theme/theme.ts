import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const customConfig = defineConfig({
  globalCss: {
    'html, body': {
      backgroundColor: '#F5F6FA',
      color: '#2C3E50',
    },
  },
  theme: {
    tokens: {
      colors: {
        primary: { value: '#2C3E50' },
        secondary: { value: '#E74C3C' },
        accent: { value: '#F1C40F' },
        bg: {
          primary: { value: '#F5F6FA' },
          secondary: { value: '#ECF0F1' },
        },
        btn: {
          cancel: { value: '#7F8C8D' },
          action: { value: '#3498DB' },
        },
      },
      fonts: {
        body: { value: '"Noto Sans JP", serif' },
        heading: { value: '"Noto Serif JP", serif' },
      },
      cursor: {
        option: { value: 'pointer' },
      },
    },
  },
});
const theme = createSystem(defaultConfig, customConfig);

export default theme;
