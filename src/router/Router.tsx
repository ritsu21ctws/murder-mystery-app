import React, { memo } from 'react';
import { Routes, Route } from 'react-router';
import { HeaderLayout } from '@/components/layouts/HeaderLayout';
import { Top } from '@/components/pages/Top';
import { Mypage } from '@/components/pages/Mypage';
import { HostedEvents } from '@/components/pages/HostedEvents';
import { JoinedEvents } from '@/components/pages/JoinedEvents';
import { ProfileEdit } from '@/components/pages/ProfileEdit';
import { Page404 } from '@/components/pages/Page404';

export const Router: React.FC = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/:user_id" element={<HeaderLayout />}>
        <Route index element={<Mypage />} />
        <Route path="mypage" element={<Mypage />} />
        <Route path="events/hosted" element={<HostedEvents />} />
        <Route path="events/joined" element={<JoinedEvents />} />
        <Route path="edit" element={<ProfileEdit />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
});
