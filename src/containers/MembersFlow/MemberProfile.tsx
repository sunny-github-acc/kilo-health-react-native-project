import { PATHS } from '@api/PathNames';
import { AvatarPrimary } from '@components/images/Image';
import {
  Body,
  BodyLoader,
  StyledDivider,
  TextLeft,
  TextPrimary,
  TextSmall,
  ViewLeft,
  ViewMargin,
  ViewMarginVertical,
  ViewRow,
  ViewRowCenteredVertical,
} from '@components/index';
import auth from '@react-native-firebase/auth';
import { selectIsSyncing } from '@state/auth/AuthReducer';
import { setFab } from '@state/events/EventsReducer';
import { selectMember } from '@state/members/MembersReducer';
import { selectTheme } from '@state/theme/ThemeReducer';
import { selectFollowing, setFollow } from '@state/user/UserReducer';
import { CONSTANTS } from '@utils/constants';
import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';

const MemberProfile = memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { isSyncingMember } = useSelector(selectIsSyncing);
  const theme = useSelector(selectTheme);
  const following = useSelector(selectFollowing);

  const {
    uid: memberUID,
    username,
    email,
    bio,
    creationTime,
    image,
    location,
    followersNumber,
    followingNumber,
  } = useSelector(selectMember);

  const userUID = auth().currentUser.uid;
  const isFollowed = following && following[memberUID] ? true : null;
  const icon = isFollowed ? CONSTANTS.Heart : CONSTANTS.AccountPlus;

  const handleFollowing = () => {
    dispatch(
      setFollow({
        uid: userUID,
        path: PATHS.Following,
        key: memberUID,
        value: !isFollowed ? true : null,
      }),
    );

    dispatch(
      setFollow({
        uid: memberUID,
        path: PATHS.Followers,
        key: userUID,
        value: !isFollowed ? true : null,
      }),
    );
  };

  useEffect(() => {
    if (username) dispatch(setFab(true));
  }, [username]);

  return (
    <Body>
      {isSyncingMember ? (
        <BodyLoader />
      ) : (
        <ScrollView>
          <ViewMargin>
            <ViewMargin>
              <AvatarPrimary
                source={{
                  uri: image?.uri,
                }}
                size={60}
              />
            </ViewMargin>

            <ViewLeft>
              {username ? <TextPrimary>{username}</TextPrimary> : null}
              {email ? <TextSmall>{email}</TextSmall> : null}
            </ViewLeft>

            <StyledDivider />

            {bio ? (
              <ViewLeft>
                <TextLeft>
                  <MaterialCommunityIcons
                    size={25}
                    color={theme.colors.white20}
                    name={CONSTANTS.EmoHappy}
                  />
                  <TextSmall>{bio}</TextSmall>
                </TextLeft>
              </ViewLeft>
            ) : null}

            <ViewMargin />

            <ViewLeft>
              {location ? (
                <TextLeft>
                  <MaterialCommunityIcons
                    size={25}
                    color={theme.colors.white20}
                    name={CONSTANTS.MapMarker}
                  />
                  <TextSmall>
                    {t('common:location')} {location}
                  </TextSmall>
                </TextLeft>
              ) : null}
            </ViewLeft>

            {bio || location ? <StyledDivider /> : null}

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

            <ViewLeft>
              <ViewMarginVertical>
                <ViewRowCenteredVertical>
                  <MaterialCommunityIcons
                    size={25}
                    color={theme.colors.white20}
                    name={CONSTANTS.AccountMultiple}
                  />

                  <TextPrimary> · {followingNumber} </TextPrimary>
                  <TextSmall>{t('common:following')}</TextSmall>

                  <TextPrimary> · {followersNumber} </TextPrimary>
                  <TextSmall>{t('common:followers')}</TextSmall>
                </ViewRowCenteredVertical>
              </ViewMarginVertical>
            </ViewLeft>

            <ViewLeft>
              <TouchableOpacity onPress={handleFollowing}>
                <ViewRowCenteredVertical>
                  <MaterialCommunityIcons
                    size={25}
                    color={theme.colors.white30}
                    name={icon}
                  />
                  <TextSmall>
                    {' '}
                    {isFollowed ? t('common:followed') : t('common:follow')}
                  </TextSmall>
                </ViewRowCenteredVertical>
              </TouchableOpacity>
            </ViewLeft>
          </ViewMargin>
        </ScrollView>
      )}
    </Body>
  );
});

MemberProfile.displayName = 'MemberProfile';

export default MemberProfile;
