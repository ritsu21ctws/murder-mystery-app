import React, { memo } from 'react';
import { Routes, Route } from 'react-router';
import { HeaderLayout } from '@/components/layouts/HeaderLayout';
import { Login } from '@/components/pages/Login';
import { Register } from '@/components/pages/Register';
import { Mypage } from '@/components/pages/Mypage';
import { Page404 } from '@/components/pages/Page404';

export const Router: React.FC = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/:user_id" element={<HeaderLayout />}>
        <Route index element={<Mypage />} />
        <Route path="mypage" element={<Mypage />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
});
