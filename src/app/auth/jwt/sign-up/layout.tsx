'use client';

import { usePathname } from 'next/navigation';
import { AuthSplitLayout } from 'src/layouts/auth-split';
import { GuestGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const pathname = usePathname();

  // 登録確認画面のパスを確認
  const isRegistrationConfirmation = pathname.includes('/auth/jwt/sign-up/registration');

  if (isRegistrationConfirmation) {
    // 登録確認画面の場合、AuthSplitLayoutを使用せずに直接childrenを表示
    return <GuestGuard>{children}</GuestGuard>;
  }

  // その他の認証関連ページでは通常通りAuthSplitLayoutを使用
  return (
    <GuestGuard>
      <AuthSplitLayout>{children}</AuthSplitLayout>
    </GuestGuard>
  );
}