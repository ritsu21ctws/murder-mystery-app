import React, { memo } from 'react';
import { useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { Card, Center, Input, Stack, Tabs } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { LoginFormData } from '@/domains/loginFormData';
import { RegisterFormData } from '@/domains/registerFormData';
import { useMessage } from '@/hooks/useMessage';
import { createAccount, fetchAccount } from '@/utils/supabaseFunctions';
import { hashPassword } from '@/utils/auth';

export const Top: React.FC = memo(() => {
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  const {
    control: controlRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors: errorsRegister },
  } = useForm<RegisterFormData>({
    defaultValues: {
      user_id: '',
      user_name: '',
      password: '',
    },
  });

  const {
    control: controlLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
  } = useForm<LoginFormData>({
    defaultValues: {
      user_id: '',
      password: '',
    },
  });

  const onSubmitRegister = handleSubmitRegister(async (data: RegisterFormData) => {
    data.password = await hashPassword(data.password);

    try {
      await createAccount(data);
      showMessage({ title: 'アカウントの登録が完了しました', type: 'success' });
      navigate(`/${data.user_id}/mypage`);
    } catch {
      showMessage({ title: 'アカウントの登録に失敗しました', type: 'error' });
    }
  });

  const onSubmitLogin = handleSubmitLogin(async (data: LoginFormData) => {
    data.password = await hashPassword(data.password);

    try {
      await fetchAccount(data);

      showMessage({ title: 'ログインに成功しました', type: 'success' });
      navigate(`/${data.user_id}/mypage`);
    } catch {
      showMessage({ title: 'ログインに失敗しました', type: 'error' });
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
                <form onSubmit={onSubmitRegister}>
                  <Stack gap="4" width="full">
                    <Field invalid={!!errorsRegister.user_id} errorText={errorsRegister.user_id?.message}>
                      <Controller
                        name="user_id"
                        control={controlRegister}
                        rules={{
                          required: 'ユーザーIDの入力は必須です',
                          pattern: { value: /^[a-zA-Z]+$/, message: 'ユーザーIDは半角英字で入力してください' },
                        }}
                        render={({ field }) => <Input {...field} placeholder="user id" />}
                      />
                    </Field>
                    <Field invalid={!!errorsRegister.user_name} errorText={errorsRegister.user_name?.message}>
                      <Controller
                        name="user_name"
                        control={controlRegister}
                        rules={{
                          required: 'ユーザー名の入力は必須です',
                        }}
                        render={({ field }) => <Input {...field} placeholder="user name" />}
                      />
                    </Field>
                    <Field invalid={!!errorsRegister.password} errorText={errorsRegister.password?.message}>
                      <Controller
                        name="password"
                        control={controlRegister}
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
                <form onSubmit={onSubmitLogin}>
                  <Stack gap="4" width="full">
                    <Field invalid={!!errorsLogin.user_id} errorText={errorsLogin.user_id?.message}>
                      <Controller
                        name="user_id"
                        control={controlLogin}
                        rules={{
                          required: 'ユーザーIDの入力は必須です',
                          pattern: { value: /^[a-zA-Z]+$/, message: 'ユーザーIDは半角英字で入力してください' },
                        }}
                        render={({ field }) => <Input {...field} placeholder="user id" />}
                      />
                    </Field>
                    <Field invalid={!!errorsLogin.password} errorText={errorsLogin.password?.message}>
                      <Controller
                        name="password"
                        control={controlLogin}
                        rules={{
                          required: 'パスワードの入力は必須です',
                          minLength: { value: 8, message: 'パスワードは8文字以上で入力してください' },
                          pattern: { value: /^[a-zA-Z0-9!-/:-@[-`{-~]*$/, message: 'パスワードは半角英数字または記号で入力してください' },
                        }}
                        render={({ field }) => <Input {...field} type="password" placeholder="password" />}
                      />
                    </Field>
                    <PrimaryButton width="full">ログイン</PrimaryButton>
                  </Stack>
                </form>
              </Tabs.Content>
            </Tabs.Root>
          </Card.Body>
        </Card.Root>
      </Stack>
    </Center>
  );
});
