import React, { memo } from 'react';
import { useParams } from 'react-router';

export const Mypage: React.FC = memo(() => {
  const { user_id } = useParams();

  return (
    <>
      <p>Mypageページです</p>
      <p>ユーザーID：{user_id}</p>
    </>
  );
});
