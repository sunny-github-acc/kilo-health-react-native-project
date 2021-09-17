import EventCard from '@components/cards/EventCard';
import {
  Body,
  BodyLoader,
  SearchButton,
  TextSmallMargin,
  ViewFlex1,
  ViewMargin,
  ViewRowSpaceAround,
} from '@components/index';
import { selectIsSyncing } from '@state/auth/AuthReducer';
import { getEvents, selectEvents } from '@state/events/EventsReducer';
import { selectTheme } from '@state/theme/ThemeReducer';
import { selectFollowing } from '@state/user/UserReducer';
import { EventValuesInterface } from '@typings/eventsTypes';
import { CONSTANTS } from '@utils/constants';
import { extractedEvents } from '@utils/functions/eventsFunctions';
import Carousel from 'pinar';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const Events = memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const carouselRef = useRef(null);

  const { isSyncingEvents } = useSelector(selectIsSyncing);
  const theme = useSelector(selectTheme);
  const following = useSelector(selectFollowing) || {};
  const events = useSelector(selectEvents) || {};

  const [index, setIndex] = useState(0);

  const { allEvents, followingEvents, attendedEvents, userEvents } =
    extractedEvents({
      events,
      following,
    });

  const styleNotSelected = {
    backgroundColor: theme.colors.primary,
  };

  const renderItem = ({ item }: { item: EventValuesInterface }) => (
    <EventCard event={item} />
  );

  const scrollTo = useCallback((index: number) => {
    setIndex(index);
    carouselRef?.current?.scrollToIndex({ index });
  }, []);

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  return (
    <Body>
      <ViewMargin>
        <ViewRowSpaceAround>
          <SearchButton
            onPress={() => scrollTo(0)}
            title={t('main:all')}
            icon={null}
            style={index !== 0 ? styleNotSelected : null}
          />

          <SearchButton
            onPress={() => scrollTo(1)}
            title={''}
            icon={CONSTANTS.AccountHeart}
            style={index !== 1 ? styleNotSelected : null}
          />

          <SearchButton
            onPress={() => scrollTo(2)}
            title={''}
            icon={CONSTANTS.Campfire}
            style={index !== 2 ? styleNotSelected : null}
          />

          <SearchButton
            onPress={() => scrollTo(3)}
            title={''}
            icon={CONSTANTS.Account}
            style={index !== 3 ? styleNotSelected : null}
          />
        </ViewRowSpaceAround>
      </ViewMargin>

      <ViewFlex1>
        {isSyncingEvents ? (
          <BodyLoader />
        ) : (
          <Carousel
            ref={carouselRef}
            onIndexChanged={({ index }) => setIndex(index)}
            controlsContainerStyle={{ display: CONSTANTS.None }}
            dotsContainerStyle={{ display: CONSTANTS.None }}
          >
            {allEvents.length > 0 ? (
              <FlatList
                data={allEvents}
                renderItem={renderItem}
                keyExtractor={(event: EventValuesInterface) =>
                  event.createdAt.toString()
                }
              />
            ) : (
              <TextSmallMargin>{t('main:noAllEvents')}</TextSmallMargin>
            )}

            {followingEvents.length > 0 ? (
              <FlatList
                data={followingEvents}
                renderItem={renderItem}
                keyExtractor={(event: EventValuesInterface) =>
                  event.createdAt.toString()
                }
              />
            ) : (
              <TextSmallMargin>{t('main:noFollowingEvents')}</TextSmallMargin>
            )}

            {attendedEvents.length > 0 ? (
              <FlatList
                data={attendedEvents}
                renderItem={renderItem}
                keyExtractor={(event: EventValuesInterface) =>
                  event.createdAt.toString()
                }
              />
            ) : (
              <TextSmallMargin>{t('main:noAttendingEvents')}</TextSmallMargin>
            )}

            {userEvents.length > 0 ? (
              <FlatList
                data={userEvents}
                renderItem={renderItem}
                keyExtractor={(event: EventValuesInterface) =>
                  event.createdAt.toString()
                }
              />
            ) : (
              <TextSmallMargin>{t('main:noUserEvents')}</TextSmallMargin>
            )}
          </Carousel>
        )}
      </ViewFlex1>
    </Body>
  );
});

Events.displayName = 'Events';

export default Events;
