import React, { memo } from 'react';
import { useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { Card, Center, Input, Stack, Tabs } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { RegisterFormData } from '@/domains/registerFormData';
import { useMessage } from '@/hooks/useMessage';
import { createAccount } from '@/utils/supabaseFunctions';
import { hashPassword } from '@/utils/auth';

export const Register: React.FC = memo(() => {
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      user_id: '',
      user_name: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit(async (data: RegisterFormData) => {
    data.password = await hashPassword(data.password);

    try {
      await createAccount(data);
      showMessage({ title: 'アカウントの登録が完了しました', type: 'success' });
      navigate(`/${data.user_id}/mypage`);
    } catch {
      showMessage({ title: 'アカウントの登録に失敗しました', type: 'error' });
    }
  });

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
                <form onSubmit={onSubmit}>
                  <Stack gap="4" width="full">
                    <Field invalid={!!errors.user_id} errorText={errors.user_id?.message}>
                      <Controller
                        name="user_id"
                        control={control}
                        rules={{
                          required: 'ユーザーIDの入力は必須です',
                          pattern: { value: /^[a-zA-Z]+$/, message: 'ユーザーIDは半角英字で入力してください' },
                        }}
                        render={({ field }) => <Input {...field} placeholder="user id" />}
                      />
                    </Field>
                    <Field invalid={!!errors.user_name} errorText={errors.user_name?.message}>
                      <Controller
                        name="user_name"
                        control={control}
                        rules={{
                          required: 'ユーザー名の入力は必須です',
                        }}
                        render={({ field }) => <Input {...field} placeholder="user name" />}
                      />
                    </Field>
                    <Field invalid={!!errors.password} errorText={errors.password?.message}>
                      <Controller
                        name="password"
                        control={control}
                        rules={{
                          required: 'パスワードの入力は必須です',
                          minLength: { value: 8, message: 'パスワードは8文字以上で入力してください' },
                          pattern: { value: /^[a-zA-Z0-9!-/:-@[-`{-~]*$/, message: 'パスワードは半角英数字または記号で入力してください' },
                        }}
                        render={({ field }) => <Input {...field} type="password" placeholder="password" />}
                      />
                    </Field>
                    <PrimaryButton type="submit" width="full">
                      登録
                    </PrimaryButton>
                  </Stack>
                </form>
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
