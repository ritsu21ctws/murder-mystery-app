import React, { memo } from 'react';
import { Outlet } from 'react-router';

export const HeaderLayout: React.FC = memo(() => {
  return (
    <>
      <p>ヘッダー</p>
      <Outlet />
    </>
  );
});
