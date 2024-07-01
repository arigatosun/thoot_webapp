'use client';

import React from 'react';
import { TextField, Button, Box, Typography, Grid, Paper, Container, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const schema = z.object({
  dentistName: z.string().min(1, '歯科医院名は必須です'),
  lastName: z.string().min(1, '姓は必須です'),
  firstName: z.string().min(1, '名は必須です'),
  lastNameKana: z.string().min(1, '姓（カナ）は必須です'),
  firstNameKana: z.string().min(1, '名（カナ）は必須です'),
  medicalLicenseNumber: z.string().regex(/^\d{3}-\d{3}-\d{3}$/, '有効な医療免許番号を入力してください'),
  postalCode: z.string().regex(/^\d{7}$/, '有効な郵便番号を入力してください'),
  prefecture: z.string().min(1, '都道府県は必須です'),
  city: z.string().min(1, '市区町村は必須です'),
  streetAddress: z.string().min(1, '番地は必須です'),
  building: z.string().optional(),
  nearestStation: z.string().optional(),
  staffCount: z.number().min(1, 'スタッフ人数を入力してください'),
  unitCount: z.number().min(1, 'ユニット台数を入力してください'),
  averagePatientsPerDay: z.number().min(1, '一日平均患者数を入力してください'),
  hasIntercom: z.string(),
  openTime: z.string().min(1, '開始時間を入力してください'),
  closeTime: z.string().min(1, '終了時間を入力してください'),
});

type BasicInfoFormData = z.infer<typeof schema>;

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#F8A1A7',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#F8A1A7',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#F8A1A7',
          },
        },
      },
    },
  },
});

export default function BasicInfoForm() {
  const { control, handleSubmit } = useForm<BasicInfoFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: BasicInfoFormData) => {
    console.log(data);
  };

  return (
    <ThemeProvider theme={theme}>
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
                    <TextField {...field} fullWidth label="姓" error={!!error} helperText={error?.message} required />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <TextField {...field} fullWidth label="名" error={!!error} helperText={error?.message} required />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastNameKana"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <TextField {...field} fullWidth label="姓（カナ）" error={!!error} helperText={error?.message} required />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstNameKana"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <TextField {...field} fullWidth label="名（カナ）" error={!!error} helperText={error?.message} required />
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
              <Grid item xs={12}>
                <Controller
                  name="city"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="市区町村"
                      error={!!error}
                      helperText={error?.message}
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="streetAddress"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="番地"
                      error={!!error}
                      helperText={error?.message}
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="building"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="建物名"
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="nearestStation"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="最寄り駅"
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom sx={{ mt: 6, mb: 3 }}>
              医院の詳細情報
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="staffCount"
                  control={control}
                  defaultValue={0}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="number"
                      label="在籍スタッフ人数"
                      error={!!error}
                      helperText={error?.message}
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="unitCount"
                  control={control}
                  defaultValue={0}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="number"
                      label="ユニット台数"
                      error={!!error}
                      helperText={error?.message}
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="averagePatientsPerDay"
                  control={control}
                  defaultValue={0}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="number"
                      label="一日平均患者数"
                      error={!!error}
                      helperText={error?.message}
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="hasIntercom"
                  control={control}
                  defaultValue="false"
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>インカム有無</InputLabel>
                      <Select {...field} label="インカム有無">
                        <MenuItem value="true">有り</MenuItem>
                        <MenuItem value="false">無し</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="openTime"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="time"
                      label="開始時間"
                      error={!!error}
                      helperText={error?.message}
                      required
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="closeTime"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="time"
                      label="終了時間"
                      error={!!error}
                      helperText={error?.message}
                      required
                      InputLabelProps={{ shrink: true }}
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
    </ThemeProvider>
  );
}