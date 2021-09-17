import { AvatarPrimary } from '@components/images/Image';
import { ViewMargin } from '@components/index';
import { TextSmall } from '@components/texts/Texts';
import { ViewLeft, ViewRowCenteredVertical } from '@components/views/Views';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@routes/RouteNames';
import { selectMembers, setMember } from '@state/members/MembersReducer';
import React, { memo, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const ChatCard = memo(({ chatUID }: { chatUID: string }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const members = useSelector(selectMembers) || {};

  const userUID = auth().currentUser.uid;
  const memberUID = chatUID.replace(userUID, '');
  const member = members[memberUID];

  const goToChat = useCallback(() => {
    navigation.navigate(ROUTES.Chat);

    dispatch(setMember(member));
  }, []);

  if (!member) return <></>;

  return (
    <ViewMargin>
      <TouchableOpacity onPress={goToChat}>
        <ViewRowCenteredVertical>
          <AvatarPrimary
            source={{
              uri: member?.image?.uri,
            }}
            size={50}
          />
          <ViewWide>
            <ViewLeft>
              <TextSmall numberOfLines={1}>{member?.username}</TextSmall>
            </ViewLeft>
          </ViewWide>
        </ViewRowCenteredVertical>
      </TouchableOpacity>
    </ViewMargin>
  );
});

ChatCard.displayName = 'ChatCard';

export default ChatCard;

const ViewWide = styled(ViewMargin)`
  flex: 1;
`;
