'use client';

import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

import { useBoolean } from 'src/hooks/use-boolean';

// 削除: import { Section } from './section'; // この行を削除（左側のコンポーネントを含むため）
import { Main, Content } from './main';
import { HeaderBase } from '../core/header-base';
import { LayoutSection } from '../core/layout-section';

// ----------------------------------------------------------------------

export type AuthSplitLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  // 削除: section?: { ... }; // このプロパティを削除（左側のセクションに関連するため）
};

export function AuthSplitLayout({ sx, children }: AuthSplitLayoutProps) {
  const mobileNavOpen = useBoolean();

  const layoutQuery: Breakpoint = 'md';

  return (
    <LayoutSection
      headerSection={
        <HeaderBase
          disableElevation
          layoutQuery={layoutQuery}
          onOpenNav={mobileNavOpen.onTrue}
          slotsDisplay={{
            signIn: false,
            account: false,
            purchase: false,
            contacts: false,
            searchbar: false,
            workspaces: false,
            menuButton: false,
            localization: false,
            notifications: false,
          }}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
          }}
          slotProps={{ container: { maxWidth: false } }}
          sx={{ position: { [layoutQuery]: 'fixed' } }}
        />
      }
      footerSection={null}
      sx={sx}
      cssVars={{
        '--layout-auth-content-width': '800px',
      }}
    >
      <Main 
        layoutQuery={layoutQuery}
        // 追加: フォームを中央に配置するためのスタイル
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        {/* 削除: <Section /> コンポーネント全体を削除（左側のセクションを表示していたため） */}
        <Content layoutQuery={layoutQuery}>
          <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
            {children}
          </Box>
        </Content>
      </Main>
    </LayoutSection>
  );
}