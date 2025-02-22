import React, { memo } from 'react';
import { useParams } from 'react-router';

export const ProfileShow: React.FC = memo(() => {
  const { user_id, profile_id } = useParams();

  return (
    <p>
      `ProfileShowページです。user_id:{user_id}, profile_id:{profile_id}`
    </p>
  );
});
