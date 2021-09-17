import { TextSecondary } from '@components/index';
import {
  selectAuthError,
  selectAuthSuccess,
  setError,
  setSuccess,
} from '@state/auth/AuthReducer';
import { selectTheme } from '@state/theme/ThemeReducer';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

export const SnackbarSuccess = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const theme = useSelector(selectTheme);
  const authSuccess = useSelector(selectAuthSuccess);

  const onDismissSnackBar = useCallback(() => {
    dispatch(setSuccess(null));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (authSuccess) dispatch(setSuccess(null));
    }, 2000);
  }, [authSuccess]);

  return (
    <SnackSuccess
      visible={authSuccess ? true : false}
      onDismiss={onDismissSnackBar}
      theme={{ colors: { accent: theme.colors.primary } }}
      action={{
        label: t('common:ok'),
        onPress: () => {
          onDismissSnackBar();
        },
      }}
    >
      <TextSecondary>{authSuccess}</TextSecondary>
    </SnackSuccess>
  );
};

export const SnackbarError = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const theme = useSelector(selectTheme);
  const authError = useSelector(selectAuthError);

  const onDismissSnackBar = useCallback(() => {
    dispatch(setError(null));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (authError) dispatch(setError(null));
    }, 2000);
  }, [authError]);

  return (
    <SnackError
      visible={authError ? true : false}
      onDismiss={onDismissSnackBar}
      theme={{ colors: { accent: theme.colors.primary } }}
      action={{
        label: t('common:ok'),
        onPress: () => {
          onDismissSnackBar();
        },
      }}
    >
      <TextSecondary>{authError}</TextSecondary>
    </SnackError>
  );
};

const SnackError = styled(Snackbar)`
  background-color: #fffa5d;
`;

const SnackSuccess = styled(Snackbar)`
  background-color: #f7f7f7;
  border-color: #fffa5d;
  border-left-width: 4px;
`;
