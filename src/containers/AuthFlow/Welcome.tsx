import {
  BodySpaceAround,
  ButtonSecondary,
  ButtonTransparent,
  TextPrimary,
  TextSmall,
  ViewMargin,
  ViewRowCentered,
} from '@components/index';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@routes/RouteNames';
import { selectTheme } from '@state/theme/ThemeReducer';
import { CONSTANTS } from '@utils/constants';
import { locale } from '@utils/locale';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

const Welcome = memo(() => {
  const { t } = useTranslation();
  const theme = useSelector(selectTheme);
  const navigation = useNavigation();

  const goToLogin = useCallback(() => {
    navigation.navigate(ROUTES.Login);
  }, []);

  const handleLocale = useCallback(() => {
    locale.changeLanguage(
      locale.language === CONSTANTS.En ? CONSTANTS.Lt : CONSTANTS.En,
    );
  }, []);

  return (
    <BodySpaceAround>
      <ViewMargin>
        <ViewRowCentered>
          <TextPrimary>Gather </TextPrimary>

          <MaterialCommunityIcons
            size={50}
            color={theme.colors.tertiary}
            name={CONSTANTS.Campfire}
          />

          <TextPrimary> ilo</TextPrimary>
        </ViewRowCentered>

        <TextPrimary>{t('welcome:congrats')}</TextPrimary>

        <TextSmall>{t('welcome:intro')}</TextSmall>
      </ViewMargin>

      <ViewMargin>
        <ButtonSecondary onPress={goToLogin} title={t('welcome:login')} />

        <ButtonTransparent
          onPress={handleLocale}
          title={t('common:changeLanguage')}
        />
      </ViewMargin>
    </BodySpaceAround>
  );
});

Welcome.displayName = 'Welcome';

export default Welcome;
