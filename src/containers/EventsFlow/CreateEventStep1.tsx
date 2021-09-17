import {
  ButtonSecondary,
  SearchButton,
  StyledDivider,
  TextLeft,
  TextSmallBold,
  ViewLeft,
  ViewMargin,
  ViewMarginVertical,
  ViewWidth,
} from '@components/index';
import { FormikInput } from '@components/input/FormikInput';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@routes/RouteNames';
import { selectEvent, setEventImage } from '@state/events/EventsReducer';
import { selectUsername } from '@state/user/UserReducer';
import { EventValues1Interface } from '@typings/eventsTypes';
import { CONSTANTS } from '@utils/constants';
import { eventAboutSchema } from '@utils/validation';
import { Formik } from 'formik';
import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

interface StepInterface {
  setStep: (e: EventValues1Interface) => void;
}

const CreateEventStep1 = memo(({ setStep }: StepInterface) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const username = useSelector(selectUsername);
  const oldEvent = useSelector(selectEvent);

  const title = useCallback(
    (text: string) => (
      <TextLeft>
        <TextSmallBold>{t('main:' + text)}</TextSmallBold>
      </TextLeft>
    ),
    [],
  );

  const goToUpdateImage = useCallback(() => {
    navigation.navigate(ROUTES.EventUpdateImage, { route: ROUTES.CreateEvent });
  }, []);

  useEffect(() => {
    if (oldEvent?.image?.uri) dispatch(setEventImage(oldEvent.image));
  }, []);

  return (
    <ViewMargin>
      <ScrollView>
        <ViewLeft>
          <Formik
            initialValues={{
              name: oldEvent?.name || username + CONSTANTS.SGathering,
              description: oldEvent?.description || '',
              type: oldEvent?.type || CONSTANTS.Active,
              setting: oldEvent?.setting || CONSTANTS.Outdoors,
              step: 1,
            }}
            validationSchema={eventAboutSchema}
            onSubmit={values => setStep(values)}
          >
            {({
              setFieldValue,
              handleSubmit,
              handleBlur,
              touched,
              values,
              errors,
            }) => (
              <ViewWidth>
                {formAbouts.map(about => (
                  <ViewMarginVertical key={about}>
                    {title(about)}

                    <FormikInput
                      setFieldValue={setFieldValue}
                      handleBlur={handleBlur}
                      input={
                        values[about as CONSTANTS.Name | CONSTANTS.Description]
                      }
                      value={about}
                      label="main:add"
                      touched={touched}
                      errors={errors}
                      multiline={about === CONSTANTS.Description}
                      maxLength={about === CONSTANTS.Name ? 50 : 150}
                    />
                  </ViewMarginVertical>
                ))}

                <ViewMarginVertical>
                  <ViewMarginVertical>{title('photo')}</ViewMarginVertical>

                  <SearchButton
                    onPress={goToUpdateImage}
                    icon={CONSTANTS.Image}
                    title={t('profile:updateImage')}
                    style={searchStyle}
                  />
                </ViewMarginVertical>

                <ViewMarginVertical>
                  <ViewMarginVertical>
                    <StyledDivider />
                  </ViewMarginVertical>

                  <ButtonSecondary
                    onPress={handleSubmit}
                    title={t('common:next')}
                  />
                </ViewMarginVertical>
              </ViewWidth>
            )}
          </Formik>
        </ViewLeft>
      </ScrollView>
    </ViewMargin>
  );
});

CreateEventStep1.displayName = 'CreateEventStep1';

export default CreateEventStep1;

const formAbouts = [CONSTANTS.Name, CONSTANTS.Description];
const searchStyle = {
  alignSelf: 'flex-start',
  marginHorizontal: 5,
};
