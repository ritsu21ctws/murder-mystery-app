import React, { memo } from 'react';
import { useParams } from 'react-router';

export const EventDetail: React.FC = memo(() => {
  const { event_id } = useParams();
  return <p>EventDetailページです。event_id:{event_id}</p>;
});
