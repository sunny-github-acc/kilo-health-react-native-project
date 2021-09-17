import MemberCard from '@components/cards/MemberCard';
import { Body, SearchInput } from '@components/index';
import { selectMembers } from '@state/members/MembersReducer';
import { selectUID } from '@state/user/UserReducer';
import { UserReducerInterface } from '@typings/userTypes';
import { CONSTANTS } from '@utils/constants';
import * as _ from 'lodash';
import React, { memo, useState } from 'react';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const MemberSearch = memo(() => {
  const members = useSelector(selectMembers) || {};
  const uid = useSelector(selectUID);

  const [input, setInput] = useState('');

  const cards = _.valuesIn(members).map((member: UserReducerInterface) => {
    const isMember = member.username
      .toLowerCase()
      .includes(input.toLowerCase());

    if (uid === member.uid || !isMember) return null;

    return <MemberCard member={member} key={member.uid} />;
  });

  return (
    <TouchableWithoutFeedback
      accessible={false}
      onPress={() => Keyboard.dismiss()}
    >
      <Body>
        <SearchInput setInput={setInput} icon={CONSTANTS.AccountSearch} />

        {cards}
      </Body>
    </TouchableWithoutFeedback>
  );
});

MemberSearch.displayName = 'MemberSearch';

export default MemberSearch;
