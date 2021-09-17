import { BodyCentered, TextPrimary, ViewRowCentered } from '@components/index';
import { selectTheme } from '@state/theme/ThemeReducer';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';

export default function Loader() {
  const { t } = useTranslation();
  const theme = useSelector(selectTheme);

  return (
    <BodyCentered>
      <ViewRowCentered>
        <ActivityIndicator animating={true} color={theme.colors.white20} />
        <TextPrimary> {t('welcome:welcome')}</TextPrimary>
      </ViewRowCentered>
    </BodyCentered>
  );
}
