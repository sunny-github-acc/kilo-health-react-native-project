import {
  TextBig,
  TextLeft,
  TextPrimary,
  TextPrimaryRegular,
  ViewLeft,
  ViewMargin,
  ViewMargin05,
} from '@components/index';
import { selectEvent } from '@state/events/EventsReducer';
import { selectTheme } from '@state/theme/ThemeReducer';
import { CONSTANTS } from '@utils/constants';
import { pascalCase } from '@utils/functions/eventsFunctions';
import * as _ from 'lodash';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

import EventTopImage from './EventTopImage';
import EventTopInfo from './EventTopInfo';

const EventTop = memo(() => {
  const { t } = useTranslation();

  const theme = useSelector(selectTheme);
  const event = useSelector(selectEvent);

  if (!event) return <></>;

  return (
    <>
      <EventTopImage />

      <>
        <ViewMargin>
          <ViewLeft>
            <TextLeft>
              <TextBig>{event?.name}</TextBig>
            </TextLeft>

            <ViewMargin05 />

            {event?.description ? (
              <TextLeft>
                <MaterialCommunityIcons
                  size={25}
                  color={theme.colors.white20}
                  name={CONSTANTS.Pen}
                />
                <TextPrimaryRegular> {event.description}</TextPrimaryRegular>
              </TextLeft>
            ) : null}

            <EventTopInfo />
          </ViewLeft>
        </ViewMargin>

        {eventValues.map(value => (
          <ViewMargin key={value}>
            <TextLeft>
              <TextPrimary>{t('main:' + value)}</TextPrimary>
            </TextLeft>
            <TextLeft>
              <TextPrimaryRegular>
                {pascalCase(event[value])}
              </TextPrimaryRegular>
            </TextLeft>
          </ViewMargin>
        ))}
      </>

      {!_.isEmpty(event?.attendees) ? (
        <>
          <ViewMargin>
            <TextLeft>
              <TextPrimary>{t('main:attendees')}</TextPrimary>
            </TextLeft>
          </ViewMargin>
        </>
      ) : null}
    </>
  );
});

EventTop.displayName = 'EventTop';

export default EventTop;

const eventValues: (
  | CONSTANTS.Setting
  | CONSTANTS.Approach
  | CONSTANTS.Audience
  | CONSTANTS.Type
  | CONSTANTS.Size
)[] = [
  CONSTANTS.Approach,
  CONSTANTS.Audience,
  CONSTANTS.Type,
  CONSTANTS.Setting,
  CONSTANTS.Size,
];
