import MemberCard from '@components/cards/MemberCard';
import { Body, BodyLoader } from '@components/index';
import { selectIsSyncing } from '@state/auth/AuthReducer';
import { selectEvent } from '@state/events/EventsReducer';
import { selectMembers } from '@state/members/MembersReducer';
import * as _ from 'lodash';
import React, { memo } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import EventBottom from './EventBottom';
import EventTop from './EventTop';

const Event = memo(() => {
  const { isSyncingEvent } = useSelector(selectIsSyncing);
  const event = useSelector(selectEvent);
  const members = useSelector(selectMembers);

  const renderItem = ({ item }: { item: string }) => (
    <MemberCard member={members[item]} />
  );

  return (
    <Body>
      {isSyncingEvent ? (
        <BodyLoader />
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            data={_.keysIn(event?.attendees)}
            renderItem={renderItem}
            keyExtractor={(attendee: string) => attendee}
            ListHeaderComponent={<EventTop />}
            ListFooterComponent={<EventBottom />}
          />
        </SafeAreaView>
      )}
    </Body>
  );
});

Event.displayName = 'Event';

export default Event;
