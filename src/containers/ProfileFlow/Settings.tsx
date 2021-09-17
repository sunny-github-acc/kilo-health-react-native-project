import { DualButton } from '@components/buttons/DualButtons';
import {
  Body,
  StyledDivider,
  TextPrimary,
  ViewLeft,
  ViewMargin,
} from '@components/index';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@routes/RouteNames';
import { logout, selectIsSyncing } from '@state/auth/AuthReducer';
import { selectTheme, setTheme } from '@state/theme/ThemeReducer';
import { CONSTANTS } from '@utils/constants';
import { locale } from '@utils/locale';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import { darkTheme } from '../../styles/dark/darkTheme';
import { defaultTheme } from '../../styles/default/theme';

const Settings = memo(() => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { isSyncingEmail, isSyncingPassword } = useSelector(selectIsSyncing);
  const theme = useSelector(selectTheme);

  const goToUpdateEmail = useCallback(() => {
    navigation.navigate(ROUTES.UpdateEmail);
  }, []);

  const goToChangePassword = useCallback(() => {
    navigation.navigate(ROUTES.ChangePassword);
  }, []);

  const handleLanguage = useCallback(() => {
    locale.changeLanguage(
      locale.language === CONSTANTS.En ? CONSTANTS.Lt : CONSTANTS.En,
    );
  }, []);

  const handleTheme = () => {
    if (theme.theme === CONSTANTS.DefaultTheme) {
      dispatch(setTheme(darkTheme));
    } else {
      dispatch(setTheme(defaultTheme));
    }
  };

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, []);

  const goToDelete = useCallback(() => {
    navigation.navigate(ROUTES.DeleteAccount);
  }, []);

  return (
    <Body>
      <ScrollView>
        <ViewMargin>
          <ViewMargin>
            <ViewLeft>
              <TextPrimary>{t('settings:userSettings')}</TextPrimary>
            </ViewLeft>
          </ViewMargin>

          <DualButton
            onPress={goToUpdateEmail}
            title={t('settings:updateEmail')}
            value={CONSTANTS.EmailEdit}
            icon={true}
            disabled={isSyncingEmail}
          />

          <DualButton
            onPress={goToChangePassword}
            title={t('settings:changePassword')}
            value={CONSTANTS.AccountKey}
            icon={true}
            disabled={isSyncingPassword}
          />

          <StyledDivider />

          <ViewMargin>
            <ViewLeft>
              <TextPrimary>{t('settings:accountSettings')}</TextPrimary>
            </ViewLeft>
          </ViewMargin>

          <DualButton
            onPress={handleLanguage}
            title={t('settings:changeLanguage')}
            value={CONSTANTS.FormatLetterCase}
            icon={true}
          />

          <DualButton
            onPress={handleTheme}
            title={t('settings:changeTheme')}
            value={CONSTANTS.Palette}
            icon={true}
          />

          <DualButton
            onPress={handleLogout}
            title={t('settings:logout')}
            value={CONSTANTS.Logout}
            icon={true}
          />

          <DualButton
            onPress={goToDelete}
            title={t('settings:deleteAccount')}
            value={CONSTANTS.AccountRemove}
            icon={true}
            color={theme.colors.tertiary}
          />
        </ViewMargin>
      </ScrollView>
    </Body>
  );
});

Settings.displayName = 'Settings';

export default Settings;
