/* eslint-disable @typescript-eslint/no-explicit-any */
import { AvatarSecondary } from '@components/images/Image';
import { ViewMarginHorizontal } from '@components/index';
import { DrawerActions, ParamListBase, Route } from '@react-navigation/native';
import {
  Scene,
  StackDescriptor,
  StackNavigationProp,
} from '@react-navigation/stack/lib/typescript/src/types';
import { ROUTES } from '@routes/RouteNames';
import { selectTheme } from '@state/theme/ThemeReducer';
import { selectImage } from '@state/user/UserReducer';
import { CONSTANTS } from '@utils/constants';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { Logo } from '../logo/Logo';

interface AppBarHeader {
  descriptor: StackDescriptor;
  previous: Scene<Route<string>>;
  navigation: StackNavigationProp<ParamListBase>;
}

export const AppBarHeader = memo(
  ({ descriptor, previous, navigation }: AppBarHeader) => {
    const { t } = useTranslation();

    const theme = useSelector(selectTheme);
    const image = useSelector(selectImage);

    const { options } = descriptor;

    let title;

    if (options.headerTitle === ROUTES.Events || !options.headerTitle) {
      title = <Logo />;
    } else {
      title = t('profile:' + options.headerTitle);
    }

    const openDrawer = useCallback(() => {
      navigation.dispatch(DrawerActions.openDrawer());
    }, []);

    return (
      <Appbar.Header theme={{ colors: { primary: theme.colors.secondary } }}>
        {previous ? (
          <Appbar.BackAction
            onPress={navigation.goBack}
            color={theme.colors.grey40}
          />
        ) : (
          <ViewMarginHorizontal>
            <TouchableOpacity onPress={openDrawer}>
              <AvatarSecondary
                size={40}
                source={{
                  uri: image?.uri,
                }}
              />
            </TouchableOpacity>
          </ViewMarginHorizontal>
        )}
        <Appbar.Content
          title={title}
          titleStyle={{
            fontSize: parseInt(theme.fonts.size.m),
            fontWeight: CONSTANTS.Bold,
            color: theme.colors.grey40,
          }}
        />
      </Appbar.Header>
    );
  },
);

AppBarHeader.displayName = 'AppBarHeader';
