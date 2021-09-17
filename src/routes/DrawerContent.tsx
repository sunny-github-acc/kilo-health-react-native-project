/* eslint-disable @typescript-eslint/no-empty-function */
import { AvatarPrimary } from '@components/images/Image';
import {
  Body,
  OutlinedButton,
  StyledDivider,
  TextPrimary,
  TextSmall,
  ViewLeft,
  ViewMargin,
  ViewMarginHorizontal,
  ViewMarginVertical,
  ViewRowCenteredVertical,
  ViewRowSpaceBetweenVertical,
} from '@components/index';
import { ROUTES } from '@routes/RouteNames';
import { selectTheme } from '@state/theme/ThemeReducer';
import { selectUser } from '@state/user/UserReducer';
import { CONSTANTS } from '@utils/constants';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

interface DrawerInterface {
  props: {
    navigation: { navigate: (e: string) => void };
  };
}

export const DrawerContent = memo(({ props }: DrawerInterface) => {
  const { t } = useTranslation();

  const { username, email, followersNumber, followingNumber, image } =
    useSelector(selectUser);
  const theme = useSelector(selectTheme);

  const goToProfile = useCallback(() => {
    props.navigation.navigate(ROUTES.Profile);
  }, []);

  const goToSettings = useCallback(() => {
    props.navigation.navigate(ROUTES.Settings);
  }, []);

  return (
    <Body>
      <ScrollView>
        <ViewMargin>
          <TouchableOpacity onPress={goToProfile}>
            <ViewMargin>
              <ViewRowSpaceBetweenVertical>
                {image?.uri ? (
                  <AvatarPrimary
                    source={{
                      uri: image.uri,
                    }}
                    size={60}
                  />
                ) : (
                  <Avatar.Icon
                    size={60}
                    icon={CONSTANTS.Account}
                    style={{ backgroundColor: theme.colors.secondary }}
                    color={theme.colors.white20}
                  />
                )}
              </ViewRowSpaceBetweenVertical>
            </ViewMargin>

            <ViewLeft>
              {username ? <TextPrimary>{username}</TextPrimary> : null}
              {email ? <TextSmall>{email}</TextSmall> : null}
            </ViewLeft>
          </TouchableOpacity>

          <ViewLeft>
            <ViewMarginVertical>
              <ViewRowCenteredVertical>
                <TextPrimary>{followingNumber} </TextPrimary>
                <TextSmall>{t('common:following')}</TextSmall>

                <TextPrimary> · {followersNumber} </TextPrimary>
                <TextSmall>{t('common:followers')}</TextSmall>
              </ViewRowCenteredVertical>
            </ViewMarginVertical>
          </ViewLeft>

          <StyledDivider />

          <ViewMarginVertical>
            <ViewRowCenteredVertical>
              <ViewMarginHorizontal>
                <MaterialCommunityIcons
                  size={35}
                  color={theme.colors.white20}
                  name={CONSTANTS.AccountEdit}
                />
              </ViewMarginHorizontal>

              <OutlinedButton
                onPress={goToProfile}
                title={t('profile:profile')}
              />
            </ViewRowCenteredVertical>
          </ViewMarginVertical>

          <ViewMarginVertical>
            <ViewRowCenteredVertical>
              <ViewMarginHorizontal>
                <MaterialCommunityIcons
                  size={35}
                  color={theme.colors.white20}
                  name={CONSTANTS.AccountCog}
                />
              </ViewMarginHorizontal>

              <OutlinedButton
                onPress={goToSettings}
                title={t('profile:settings')}
              />
            </ViewRowCenteredVertical>
          </ViewMarginVertical>
        </ViewMargin>
      </ScrollView>
    </Body>
  );
});

DrawerContent.displayName = 'DrawerContent';
