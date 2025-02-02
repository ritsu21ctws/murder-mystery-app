import React, { memo } from 'react';
import { Button, Card, Center, Input, Stack } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';

export const Register: React.FC = memo(() => {
  return (
    <Center height="100vh">
      <Card.Root variant="elevated" minW="sm">
        <Card.Header textAlign="center">
          <Card.Title>会員登録</Card.Title>
        </Card.Header>
        <Card.Body>
          <Stack gap="4" width="full">
            <Field label="ユーザーID">
              <Input />
            </Field>
            <Field label="ユーザー名">
              <Input />
            </Field>
            <Field label="パスワード">
              <Input type="password" />
            </Field>
          </Stack>
        </Card.Body>
        <Card.Footer>
          <Button width="full" colorPalette="teal">
            登録する
          </Button>
        </Card.Footer>
      </Card.Root>
    </Center>
  );
});
