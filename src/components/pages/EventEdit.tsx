import React, { memo } from 'react';
import { useParams } from 'react-router';

export const EventEdit: React.FC = memo(() => {
  const { event_id } = useParams();
  return <p>EventEditページです。event_id:{event_id}</p>;
});
