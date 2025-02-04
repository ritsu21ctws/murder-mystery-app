import React, { memo } from 'react';
import { Routes, Route } from 'react-router';
import { HeaderLayout } from '@/components/layouts/HeaderLayout';
import { Top } from '@/components/pages/Top';
import { Mypage } from '@/components/pages/Mypage';
import { Page404 } from '@/components/pages/Page404';

export const Router: React.FC = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/:user_id" element={<HeaderLayout />}>
        <Route index element={<Mypage />} />
        <Route path="mypage" element={<Mypage />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
});
