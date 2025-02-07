import App from '../App';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/theme/theme';

describe('App', () => {
  test('タイトルがあること', async () => {
    render(
      <BrowserRouter>
        <ChakraProvider value={theme}>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    );
    const title = screen.getByTestId('title');
    expect(title).toBeInTheDocument();
  });
});
