import { Router } from '@/router/Router';
import { Toaster } from '@/components/ui/toaster';
import '@/types/@chakra-ui';

function App() {
  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}

export default App;
