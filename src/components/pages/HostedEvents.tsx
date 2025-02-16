import React, { memo } from 'react';
import { useNavigate } from 'react-router';
import { PrimaryButton } from '../atoms/PrimaryButton';

export const HostedEvents: React.FC = memo(() => {
  const navigate = useNavigate();

  const onClickCreateEvent = () => {
    navigate(`../create`);
  };

  return (
    <>
      <p>HostedEventsページです</p>
      <PrimaryButton onClick={onClickCreateEvent}>イベント作成</PrimaryButton>
    </>
  );
});
