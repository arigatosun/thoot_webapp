'use client';

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoIcon from '@mui/icons-material/Info';
import { useRouter } from 'next/navigation';

export function RegistrationConfirmation() {
  const email = 'abc_defg7777@gmail.com'; // この値は実際のユーザーのメールアドレスに置き換えてください
  const router = useRouter();

  const handleResend = (event: React.MouseEvent) => {
    event.preventDefault();
    router.push('/auth/jwt/sign-up'); // sign-up画面へのパスを適切に設定してください
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 5, p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <EmailIcon sx={{ fontSize: 60, color: '#F8A1A7', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            認証用メールをご確認ください
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
            {email}
          </Typography>
          <Typography variant="body2" align="center" sx={{ mb: 2 }}>
            上記に認証用URLを送信しました。
            メールに記載されている認証用URLから
            会員登録を進めてください。
          </Typography>
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            ※ご登録はまだ完了していません
          </Typography>
        </Box>

        <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
            <InfoIcon sx={{ mr: 1, color: 'info.main' }} />
            <Typography variant="subtitle1">
              メールが届かない場合
            </Typography>
          </Box>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <CheckCircleOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="ゴミ箱、迷惑メールボックスに届いている場合があります" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <React.Fragment>
                    <Link 
                      href="#" 
                      onClick={handleResend} 
                      color="primary"
                      sx={{ display: 'inline', textDecoration: 'underline' }}
                    >
                      こちら
                    </Link>
                    から再送信をお試しください
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </Paper>
      </Paper>
    </Container>
  );
}