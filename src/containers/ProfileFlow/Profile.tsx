import { AvatarPrimary } from '@components/images/Image';
import {
  Body,
  OutlinedButton,
  StyledDivider,
  TextLeft,
  TextPrimary,
  TextSmall,
  ViewLeft,
  ViewMargin,
  ViewMarginVertical05,
  ViewRow,
  ViewRowCenteredVertical,
  ViewRowSpaceBetweenVertical,
} from '@components/index';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@routes/RouteNames';
import { selectIsSyncing } from '@state/auth/AuthReducer';
import { selectTheme } from '@state/theme/ThemeReducer';
import { selectUser } from '@state/user/UserReducer';
import { CONSTANTS } from '@utils/constants';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, Avatar, Badge } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

const Profile = memo(() => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const { isSyncingProfile, isSyncingImage } = useSelector(selectIsSyncing);
  const theme = useSelector(selectTheme);

  const {
    username,
    email,
    bio,
    location,
    image,
    creationTime,
    followingNumber,
    followersNumber,
  } = useSelector(selectUser);

  const goToEditProfile = useCallback(() => {
    navigation.navigate(ROUTES.EditProfile);
  }, []);

  const goToUpdateImage = useCallback(() => {
    navigation.navigate(ROUTES.UpdateImage);
  }, []);

  return (
    <Body>
      <ScrollView>
        <ViewMargin>
          <ViewMargin>
            <ViewRowSpaceBetweenVertical>
              <TouchableOpacity
                onPress={goToUpdateImage}
                disabled={isSyncingImage}
              >
                {image ? (
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
                    color={theme.colors.white20}
                  />
                )}

                {isSyncingImage ? (
                  <ActivityIndicatorStyled
                    animating={true}
                    color={theme.colors.secondary}
                  />
                ) : (
                  <BadgeStyled>♲</BadgeStyled>
                )}
              </TouchableOpacity>

              <OutlinedButton
                onPress={goToEditProfile}
                title={
                  isSyncingProfile
                    ? t('common:saving')
                    : t('profile:editProfile')
                }
                disabled={isSyncingProfile}
              />
            </ViewRowSpaceBetweenVertical>
          </ViewMargin>

          <ViewLeft>
            {username && <TextPrimary>{username}</TextPrimary>}
            {email && <TextSmall>{email}</TextSmall>}
          </ViewLeft>

          <ViewMarginVertical05>
            <StyledDivider />
          </ViewMarginVertical05>

          {bio ? (
            <ViewLeft>
              <TextLeft>
                <MaterialCommunityIcons
                  size={25}
                  color={theme.colors.white20}
                  name={CONSTANTS.EmoHappy}
                />
                <TextSmall> {bio}</TextSmall>
              </TextLeft>
            </ViewLeft>
          ) : null}

          <ViewMarginVertical05 />

          <ViewLeft>
            {location ? (
              <TextLeft>
                <MaterialCommunityIcons
                  size={25}
                  color={theme.colors.white20}
                  name={CONSTANTS.MapMarker}
                />
                <TextSmall>
                  {' '}
                  {t('common:location')} {location}
                </TextSmall>
              </TextLeft>
            ) : null}
          </ViewLeft>

          <ViewMarginVertical05 />

          {creationTime ? (
            <ViewLeft>
              <ViewRow>
                <MaterialCommunityIcons
                  size={25}
                  color={theme.colors.white20}
                  name={CONSTANTS.CalendarMonth}
                />

                <TextSmall>
                  {' '}
                  {t('profile:joined')} {creationTime.slice(0, 10)}
                </TextSmall>
              </ViewRow>
            </ViewLeft>
          ) : null}

          <ViewMarginVertical05 />

          <ViewLeft>
            <ViewRowCenteredVertical>
              <MaterialCommunityIcons
                size={25}
                color={theme.colors.white20}
                name={CONSTANTS.AccountMultiple}
              />

              <TextPrimary> {followingNumber} </TextPrimary>
              <TextSmall>{t('common:following')}</TextSmall>

              <TextPrimary> · {followersNumber} </TextPrimary>
              <TextSmall>{t('common:followers')}</TextSmall>
            </ViewRowCenteredVertical>
          </ViewLeft>
        </ViewMargin>
      </ScrollView>
    </Body>
  );
});

Profile.displayName = 'Profile';

export default Profile;

const BadgeStyled = styled(Badge)`
  font-size: ${props => props.theme.fonts.size.xs};
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.white20};
  position: absolute;
  top: 40px;
`;

const ActivityIndicatorStyled = styled(ActivityIndicator)`
  position: absolute;
  left: 40px;
  top: 40px;
`;
