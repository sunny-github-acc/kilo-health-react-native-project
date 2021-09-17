import { PATHS } from '@api/PathNames';
import { AvatarPrimary } from '@components/images/Image';
import { ViewMargin } from '@components/index';
import { TextSmall } from '@components/texts/Texts';
import { ViewLeft, ViewRowCenteredVertical } from '@components/views/Views';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@routes/RouteNames';
import { clearMessages } from '@state/auth/AuthReducer';
import { setFab } from '@state/events/EventsReducer';
import { getMember } from '@state/members/MembersReducer';
import { selectTheme } from '@state/theme/ThemeReducer';
import { selectFollowing, setFollow } from '@state/user/UserReducer';
import { UserReducerInterface } from '@typings/userTypes';
import { CONSTANTS } from '@utils/constants';
import * as _ from 'lodash';
import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const MemberCard = memo(({ member }: { member: UserReducerInterface }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const theme = useSelector(selectTheme);
  const following = useSelector(selectFollowing);

  const userUID = auth().currentUser.uid;

  if (!_.has(member, 'uid')) return <></>;

  const { uid: memberUID, username, bio, image } = member;
  const isFollowed = following && following[memberUID] ? true : null;
  const icon = isFollowed ? CONSTANTS.Heart : CONSTANTS.AccountPlus;

  const goToMemberProfile = () => {
    dispatch(clearMessages());

    if (userUID !== memberUID) {
      navigation.navigate(ROUTES.Members);
      navigation.navigate(ROUTES.MemberProfile);

      dispatch(getMember(memberUID));

      dispatch(setFab(true));
    } else {
      navigation.navigate(ROUTES.Profile);
    }
  };

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

  return (
    <ViewMargin>
      <TouchableOpacity onPress={goToMemberProfile}>
        <ViewRowCenteredVertical>
          <AvatarPrimary
            source={{
              uri: image?.uri,
            }}
            size={50}
          />
          <ViewWide>
            <ViewLeft>
              <TextSmall numberOfLines={1}>{username}</TextSmall>
              <TextSmall numberOfLines={1}>{bio}</TextSmall>
            </ViewLeft>
          </ViewWide>
          <TouchableOpacity onPress={handleFollowing}>
            <MaterialCommunityIcons
              size={40}
              color={theme.colors.white30}
              name={icon}
            />
          </TouchableOpacity>
        </ViewRowCenteredVertical>
      </TouchableOpacity>
    </ViewMargin>
  );
});

MemberCard.displayName = 'MemberCard';

export default MemberCard;

const ViewWide = styled(ViewMargin)`
  flex: 1;
`;
