import { DualButton } from '@components/buttons/DualButtons';
import { Body, ViewMargin } from '@components/index';
import { FormikInput } from '@components/input/FormikInput';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@routes/RouteNames';
import {
  selectSelectedLocation,
  setSelectedLocation,
} from '@state/events/EventsReducer';
import { selectTheme } from '@state/theme/ThemeReducer';
import {
  selectBio,
  selectEditProfileSubmit,
  selectLocation,
  selectUsername,
  setEditProfileSubmit,
  setValue,
} from '@state/user/UserReducer';
import { CONSTANTS } from '@utils/constants';
import { editProfileSchema } from '@utils/validation';
import { Formik } from 'formik';
import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeInterface } from 'styled-components/native';

const EditProfile = memo(() => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const theme = useSelector(selectTheme);
  const username = useSelector(selectUsername);
  const bio = useSelector(selectBio);
  const location = useSelector(selectLocation);
  const editProfileSubmit = useSelector(selectEditProfileSubmit);
  const selectedLocation = useSelector(selectSelectedLocation);

  const goToSearchLocation = useCallback(() => {
    navigation.navigate(ROUTES.SearchLocation);
  }, []);

  const handleSubmit = useCallback(({ username, bio, location }) => {
    if (bio === '') bio = null;

    dispatch(setValue({ username, bio, location }));

    navigation.goBack();

    dispatch(setEditProfileSubmit(null));
  }, []);

  useEffect(() => {
    dispatch(setSelectedLocation(null));
  }, []);

  return (
    <Body>
      <ScrollView>
        <Formik
          initialValues={{
            username,
            bio,
          }}
          validationSchema={editProfileSchema}
          onSubmit={values => {
            handleSubmit({ ...values, location: selectedLocation });
          }}
        >
          {({
            setFieldValue,
            handleSubmit,
            handleBlur,
            touched,
            values,
            errors,
          }) => {
            setTimeout(() => {
              if (editProfileSubmit !== handleSubmit) {
                dispatch(setEditProfileSubmit(handleSubmit));
              }
            }, 0);

            return (
              <ViewMargin>
                <ViewMargin>
                  <FormikInput
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                    input={values.username}
                    value={CONSTANTS.Username}
                    label={CONSTANTS.ProfileDots}
                    touched={touched}
                    errors={errors}
                  />

                  <FormikInput
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                    input={values.bio}
                    value={CONSTANTS.Bio}
                    label={CONSTANTS.ProfileDots}
                    multiline={true}
                    touched={touched}
                    errors={errors}
                  />

                  <DualButton
                    onPress={goToSearchLocation}
                    title={
                      selectedLocation || location
                        ? selectedLocation || location
                        : t('profile:selectLocation')
                    }
                    chevron={true}
                    textStyle={buttonTextStyle(theme)}
                    color={theme.colors.grey40}
                    icon={false}
                  />
                </ViewMargin>
              </ViewMargin>
            );
          }}
        </Formik>
      </ScrollView>
    </Body>
  );
});

EditProfile.displayName = 'EditProfile';

export default EditProfile;

const buttonTextStyle = (theme: ThemeInterface) => ({
  fontWeight: theme.fonts.weight.regular,
  fontSize: parseInt(theme.fonts.size.s.slice(0, -2)),
  color: theme.colors.white20,
});
