import {
  ButtonTransparent,
  StyledDivider,
  ViewRowNoWrap,
} from '@components/index';
import { CONSTANTS } from '@utils/constants';
import {
  updatedDate,
  weekdaysStartingToday,
} from '@utils/functions/eventsFunctions';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

interface DaysInterface {
  setFieldValue: (e1: string, e2: Date) => void;
  setDate: (e: Date) => void;
  date: Date;
  values: { date: Date };
}

const CreateEventStepDays = memo((props: DaysInterface) => {
  const { t } = useTranslation();

  const { setFieldValue, date, setDate, values } = props;

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <ViewRowNoWrap>
        {weekdaysStartingToday().map((day: string, interval: number) => {
          const intervalDate = updatedDate({
            days: new Date().getDate() + interval,
            hours: date.getHours(),
          });

          let title = day;

          if (interval === 0) title = CONSTANTS.Today;
          if (interval === 1) title = CONSTANTS.Tomorrow;

          return (
            <View key={day}>
              <Divider />

              <ButtonTransparent
                onPress={() => {
                  setFieldValue(CONSTANTS.Date, intervalDate);
                  setDate(intervalDate);
                }}
                title={t('main:week' + title)}
                style={buttonStyle}
                styleText={
                  values?.date?.getDate() !== intervalDate.getDate() &&
                  styleNotSelected
                }
              />

              <Divider />
            </View>
          );
        })}
      </ViewRowNoWrap>
    </ScrollView>
  );
});

CreateEventStepDays.displayName = 'CreateEventStepDays';

export default CreateEventStepDays;

const Divider = styled(StyledDivider)`
  margin: 0;
  margin-bottom: 0.5px;
`;

const styleNotSelected = {
  opacity: 0.7,
};

const buttonStyle = {
  marginVertical: 0,
};
