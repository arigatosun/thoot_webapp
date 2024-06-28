'use client';

import React from 'react';
import { TextField, Button, Box, Typography, Grid, Paper, Container } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  dentistName: z.string().min(1, '歯科医院名は必須です'),
  lastName: z.string().min(1, '姓は必須です'),
  firstName: z.string().min(1, '名は必須です'),
  lastNameKana: z.string().min(1, '姓（カナ）は必須です'),
  firstNameKana: z.string().min(1, '名（カナ）は必須です'),
  medicalLicenseNumber: z.string().regex(/^\d{3}-\d{3}-\d{3}$/, '有効な医療免許番号を入力してください'),
  postalCode: z.string().regex(/^\d{7}$/, '有効な郵便番号を入力してください'),
  prefecture: z.string().min(1, '都道府県は必須です'),
});

type BasicInfoFormData = z.infer<typeof schema>;

export default function BasicInfoForm() {
  const { control, handleSubmit } = useForm<BasicInfoFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: BasicInfoFormData) => {
    console.log(data);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          基本情報を入力してください
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 3 }}>
            歯科医院情報
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="dentistName"
                control={control}
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="歯科医院名"
                    error={!!error}
                    helperText={error?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField {...field} fullWidth label="姓" error={!!error} helperText={error?.message} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField {...field} fullWidth label="名" error={!!error} helperText={error?.message} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastNameKana"
                control={control}
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField {...field} fullWidth label="姓（カナ）" error={!!error} helperText={error?.message} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstNameKana"
                control={control}
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField {...field} fullWidth label="名（カナ）" error={!!error} helperText={error?.message} />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="medicalLicenseNumber"
                control={control}
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="医療免許番号"
                    error={!!error}
                    helperText={error?.message || '例: 123-456-789'}
                    required
                  />
                )}
              />
            </Grid>
          </Grid>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 6, mb: 3 }}>
            住所情報
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="postalCode"
                control={control}
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="郵便番号（全角ハイフンなし）"
                    error={!!error}
                    helperText={error?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ mt: 1, color: 'white', py: 1.5 }} 
              >
                検索
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="prefecture"
                control={control}
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="都道府県"
                    error={!!error}
                    helperText={error?.message}
                    required
                  />
                )}
              />
            </Grid>
          </Grid>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary" 
            sx={{ mt: 8, mb: 2, py: 2, fontSize: '1.1rem', color: 'white' }}
          >
            登録
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}