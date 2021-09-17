import { TextPrimary, ViewRowCentered } from '@components/index';
import { selectTheme } from '@state/theme/ThemeReducer';
import { CONSTANTS } from '@utils/constants';
import React, { memo } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

export const Logo = memo(() => {
  const theme = useSelector(selectTheme);

  return (
    <ViewRowCentered>
      <TextPrimary>Gather </TextPrimary>
      <MaterialCommunityIcons
        size={50}
        color={theme.colors.tertiary}
        name={CONSTANTS.Campfire}
      />
      <TextPrimary> ilo</TextPrimary>
    </ViewRowCentered>
  );
});

Logo.displayName = 'Logo';
