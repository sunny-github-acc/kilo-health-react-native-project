import {
  Body,
  ButtonTransparent,
  SearchInput,
  TextLeft,
  TextSmall,
  TextSmallBold,
  ViewLeft,
  ViewMargin,
  ViewMarginVertical,
} from '@components/index';
import { useNavigation } from '@react-navigation/native';
import { selectIsSyncing } from '@state/auth/AuthReducer';
import {
  findLocations,
  selectLocations,
  selectLocationsError,
  setLocations,
  setLocationsError,
  setSelectedLocation,
} from '@state/events/EventsReducer';
import { selectTheme } from '@state/theme/ThemeReducer';
import { CONSTANTS } from '@utils/constants';
import { Formik } from 'formik';
import * as _ from 'lodash';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

export interface FormCES4Interface {
  location: string;
}

const SearchLocation = memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { isSyncingLocation } = useSelector(selectIsSyncing);
  const theme = useSelector(selectTheme);
  const locations = useSelector(selectLocations);
  const locationsError = useSelector(selectLocationsError);

  const handleLocations = useCallback(
    _.debounce(input => {
      dispatch(setLocations([]));
      dispatch(setLocationsError(false));

      if (input.length < 3) return null;
      else dispatch(findLocations(input));
    }, 500),
    [],
  );

  const handleSubmit = useCallback(({ location }) => {
    dispatch(setSelectedLocation(location));

    dispatch(setLocations([]));

    navigation.goBack();
  }, []);

  return (
    <Body>
      <Formik
        initialValues={{
          location: '',
        }}
        onSubmit={values => handleSubmit(values)}
      >
        {({ setFieldValue, handleSubmit }) => (
          <ViewMargin>
            <SearchInput
              setInput={handleLocations}
              isGoBack={false}
              icon={CONSTANTS.MapMarkerPlus}
              inputStyle={inputStyle}
            />

            {locations.length > 0 || locationsError || isSyncingLocation ? (
              <ViewMarginVertical>
                <TextLeft>
                  <TextSmallBold>{t('main:locations')} </TextSmallBold>
                </TextLeft>
              </ViewMarginVertical>
            ) : null}

            {isSyncingLocation ? (
              <ViewLeft>
                <ViewMargin>
                  <ActivityIndicator
                    animating={true}
                    color={theme.colors.white20}
                  />
                </ViewMargin>
              </ViewLeft>
            ) : null}

            <ViewLeft>
              {!locationsError ? (
                locations.map(({ city, country, key }) => {
                  const locationString = city + ', ' + country;

                  return (
                    <ButtonTransparent
                      onPress={() => {
                        setFieldValue(CONSTANTS.Location, locationString);
                        handleSubmit();
                      }}
                      title={locationString}
                      style={buttonStyle}
                      key={key}
                    />
                  );
                })
              ) : (
                <TextSmall>{t('errorMessages:location')}</TextSmall>
              )}
            </ViewLeft>
          </ViewMargin>
        )}
      </Formik>
    </Body>
  );
});

SearchLocation.displayName = 'SearchLocation';

export default SearchLocation;

const buttonStyle = {
  marginVertical: 1.25,
  paddingVertical: 1.25,
};

const inputStyle = {
  paddingRight: 60,
};
