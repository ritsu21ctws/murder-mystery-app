import React, { memo } from 'react';
import { Button } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  width?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
};

export const PrimaryButton: React.FC<Props> = memo((props) => {
  const { children, type, width, disabled = false, loading = false, onClick } = props;
  return (
    <Button bg="primary" type={type} width={width} _hover={{ opacity: 0.9 }} disabled={disabled || loading} loading={loading} onClick={onClick}>
      {children}
    </Button>
  );
});
