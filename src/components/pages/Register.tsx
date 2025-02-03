import React, { memo } from 'react';
import { Card, Center, Input, Stack, Tabs } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';

export const Register: React.FC = memo(() => {
  return (
    <Center mt="10">
      <Stack gap="6">
        <Card.Root variant="elevated" minW="340px">
          <Card.Body>
            <Tabs.Root defaultValue="register" mt="-3">
              <Tabs.List>
                <Tabs.Trigger value="register" width="full" justifyContent="center" _before={{ backgroundColor: 'primary' }}>
                  会員登録
                </Tabs.Trigger>
                <Tabs.Trigger value="login" width="full" justifyContent="center">
                  ログイン
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="register">
                <Stack gap="4" width="full">
                  <Field>
                    <Input placeholder="user id" />
                  </Field>
                  <Field>
                    <Input placeholder="user name" />
                  </Field>
                  <Field>
                    <Input type="password" placeholder="password" />
                  </Field>
                  <PrimaryButton width="full">登録</PrimaryButton>
                </Stack>
              </Tabs.Content>
              <Tabs.Content value="login">
                <Stack gap="4" width="full">
                  <Field>
                    <Input placeholder="user id" />
                  </Field>
                  <Field>
                    <Input type="password" placeholder="password" />
                  </Field>
                  <PrimaryButton width="full">ログイン</PrimaryButton>
                </Stack>
              </Tabs.Content>
            </Tabs.Root>
          </Card.Body>
        </Card.Root>
      </Stack>
    </Center>
  );
});
