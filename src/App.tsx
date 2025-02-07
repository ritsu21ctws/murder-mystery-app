import { Router } from '@/router/Router';
import { Toaster } from '@/components/ui/toaster';
import '@/types/@chakra-ui.d.ts';

function App() {
  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}

export default App;
