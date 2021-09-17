import {
  ButtonSecondary,
  StyledDivider,
  ViewLeft,
  ViewMargin,
  ViewMarginVertical,
} from '@components/index';
import { selectEvent } from '@state/events/EventsReducer';
import { EventValues2Interface } from '@typings/eventsTypes';
import { CONSTANTS } from '@utils/constants';
import { Formik } from 'formik';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import CreateEventStep2Approach from './CreateEventStep2Approach';
import CreateEventStep2Audience from './CreateEventStep2Audience';
import CreateEventStep2Settings from './CreateEventStep2Settings';
import CreateEventStep2Size from './CreateEventStep2Size';
import CreateEventStep2Types from './CreateEventStep2Types';

interface StepInterface {
  setStep: (e: EventValues2Interface) => void;
}

const CreateEventStep2 = memo(({ setStep }: StepInterface) => {
  const { t } = useTranslation();

  const oldEvent = useSelector(selectEvent);

  return (
    <ViewMargin>
      <ScrollView>
        <ViewLeft>
          <Formik
            initialValues={{
              approach: oldEvent?.approach || CONSTANTS.Casual,
              audience: oldEvent?.audience || CONSTANTS.All,
              type: oldEvent?.type || CONSTANTS.Active,
              setting: oldEvent?.setting || CONSTANTS.Outdoors,
              size: oldEvent?.size || '4',
              step: 2,
            }}
            onSubmit={values => setStep(values)}
          >
            {({ setFieldValue, handleSubmit, values }) => (
              <ViewMarginVertical>
                <CreateEventStep2Approach
                  setFieldValue={setFieldValue}
                  approach={values.approach}
                />

                <CreateEventStep2Audience
                  setFieldValue={setFieldValue}
                  audience={values.audience}
                />

                <CreateEventStep2Types
                  setFieldValue={setFieldValue}
                  type={values.type}
                />

                <CreateEventStep2Settings
                  setFieldValue={setFieldValue}
                  setting={values.setting}
                />

                <CreateEventStep2Size
                  setFieldValue={setFieldValue}
                  size={values.size}
                />

                <ViewMarginVertical>
                  <StyledDivider />
                </ViewMarginVertical>

                <ButtonSecondary
                  onPress={handleSubmit}
                  title={t('common:next')}
                />
              </ViewMarginVertical>
            )}
          </Formik>
        </ViewLeft>
      </ScrollView>
    </ViewMargin>
  );
});

CreateEventStep2.displayName = 'CreateEventStep2';

export default CreateEventStep2;
