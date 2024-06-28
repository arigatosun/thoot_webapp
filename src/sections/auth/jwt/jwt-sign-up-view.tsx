'use client';

import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { signUp } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------

export type SignUpSchemaType = zod.infer<typeof SignUpSchema>;

export const SignUpSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'メールアドレスを入力してください' })
    .email({ message: '有効なメールアドレスを入力してください' }),
  password: zod
    .string()
    .min(1, { message: 'パスワードを入力してください' })
    .min(8, { message: 'パスワードは8文字以上である必要があります' })
    .regex(/[A-Z]/, { message: 'パスワードには少なくとも1つの大文字を含める必要があります' }),
});

// ----------------------------------------------------------------------
// PasswordRequirements コンポーネントを追加
const PasswordRequirements = ({ password }: { password: string }) => {
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);

  return (
    <Stack spacing={1} sx={{ mt: 2 }}>
      <Typography variant="caption" color={hasMinLength ? 'success.main' : 'text.secondary'}>
        ✓ 8文字以上
      </Typography>
      <Typography variant="caption" color={hasUpperCase ? 'success.main' : 'text.secondary'}>
        ✓ 大文字を1文字以上含む
      </Typography>
    </Stack>
  );
};

export function JwtSignUpView() {
  const router = useRouter();

  const password = useBoolean();

  const [errorMsg, setErrorMsg] = useState('');

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch, // 追加: watch関数を取得
  } = methods;

  const passwordValue = watch('password'); // 追加: パスワードの値を監視

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp({
        email: data.email,
        password: data.password,
        firstName: '',
        lastName: '',
      });

      router.push(paths.auth.jwt.signUp.registration);
    } catch (error) {
      console.error(error);
      setErrorMsg(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  });

  const renderHead = (
    <Stack spacing={1.5} sx={{ mb: 5 }}>
      <Typography variant="h5">Thootに登録</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          既にアカウントをお持ちですか?
        </Typography>

        <Link component={RouterLink} href={paths.auth.jwt.signIn} variant="subtitle2">
          ログイン
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={3}>
      <Field.Text name="email" label="メールアドレス" InputLabelProps={{ shrink: true }} />
  
      <Field.Text
        name="password"
        label="パスワード"
        placeholder="8文字以上、大文字を含む" // 変更: プレースホルダーテキストを更新
        type={password.value ? 'text' : 'password'}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <PasswordRequirements password={passwordValue} /> {/* 追加: パスワード要件コンポーネントを表示 */}
  
      <LoadingButton
  fullWidth
  color="inherit"
  size="large"
  type="submit"
  variant="contained"
  loading={isSubmitting}
  loadingIndicator="登録中..."
  sx={{
    backgroundColor: "#F8A1A7",
    '&:hover': { backgroundColor: "#F8A1A7" },
    '&:disabled': { backgroundColor: "#F8A1A7" }
  }}
>
  登録する
</LoadingButton>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        mt: 3,
        textAlign: 'center',
        typography: 'caption',
        color: 'text.secondary',
      }}
    >
      {'By signing up, I agree to '}
      <Link underline="always" color="text.primary">
        Terms of service
      </Link>
      {' and '}
      <Link underline="always" color="text.primary">
        Privacy policy
      </Link>
      .
    </Typography>
  );

  return (
    <>
      {renderHead}

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>

      {renderTerms}
    </>
  );
}