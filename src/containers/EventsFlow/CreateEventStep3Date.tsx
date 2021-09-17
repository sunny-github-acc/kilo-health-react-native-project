import { SearchButton, ViewRow } from '@components/index';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CONSTANTS } from '@utils/constants';
import { dateToString } from '@utils/functions/eventsFunctions';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';

interface DateInterface {
  date: Date;
  setDate: (e: Date) => void;
  setValue: (e1: string, e2: Date | string) => void;
}

const CreateEventStep3Date = memo(
  ({ date, setDate, setValue }: DateInterface) => {
    const { t } = useTranslation();

    const [dateString, setDateString] = useState({ date: null, time: null });
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);

    const onDateChange = useCallback((event: null, selectedDate: Date) => {
      setShowDate(Platform.OS === CONSTANTS.Ios);
      setShowTime(Platform.OS === CONSTANTS.Ios);

      if (!selectedDate) return null;

      setDate(selectedDate);
      setValue(CONSTANTS.Date, selectedDate);
    }, []);

    const showDatepicker = useCallback(() => {
      setShowDate(true);
    }, []);

    const showTimepicker = useCallback(() => {
      setShowTime(true);
    }, []);

    useEffect(() => {
      setDateString(dateToString(date));
    }, [date]);

    return (
      <ViewRow>
        {showDate ? (
          <DateTimePicker
            testID={CONSTANTS.DateTimePicker}
            value={date}
            mode={CONSTANTS.Date}
            is24Hour={true}
            display={CONSTANTS.Default}
            onChange={onDateChange}
            minimumDate={new Date()}
          />
        ) : null}

        <SearchButton
          onPress={showDatepicker}
          icon={CONSTANTS.CalendarMonth}
          title={dateString.date || t('main:selectDate')}
          style={searchStyle}
        />

        {showTime ? (
          <DateTimePicker
            testID={CONSTANTS.DateTimePicker}
            value={date}
            mode={CONSTANTS.Time}
            is24Hour={true}
            display={CONSTANTS.Default}
            onChange={onDateChange}
            minimumDate={new Date()}
            minuteInterval={5}
          />
        ) : null}

        <SearchButton
          onPress={showTimepicker}
          icon={CONSTANTS.Clock}
          title={dateString.time || t('main:selectTime')}
          style={searchStyle}
        />
      </ViewRow>
    );
  },
);

CreateEventStep3Date.displayName = 'CreateEventStep3Date';

export default CreateEventStep3Date;

const searchStyle = {
  alignSelf: 'flex-start',
  marginHorizontal: 5,
};
