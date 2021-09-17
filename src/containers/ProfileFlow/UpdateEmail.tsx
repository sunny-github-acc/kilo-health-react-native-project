import { Body, ViewMargin } from '@components/index';
import { FormikInput } from '@components/input/FormikInput';
import { useNavigation } from '@react-navigation/native';
import {
  selectUpdateEmailSubmit,
  setEditProfileSubmit,
  setEmail,
  setUpdateEmailSubmit,
} from '@state/user/UserReducer';
import { CONSTANTS } from '@utils/constants';
import { emailSchema } from '@utils/validation';
import { Formik } from 'formik';
import React, { memo, useCallback } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

const UpdateEmail = memo(() => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const updateEmailSubmit = useSelector(selectUpdateEmailSubmit);

  const handleSubmit = useCallback(({ email, passwordConfirm }) => {
    dispatch(setEmail({ email, passwordConfirm }));

    navigation.goBack();

    dispatch(setEditProfileSubmit(null));
  }, []);

  return (
    <Body>
      <ScrollView>
        <Formik
          initialValues={{
            email: '',
            passwordConfirm: '',
          }}
          validationSchema={emailSchema}
          onSubmit={values => {
            handleSubmit(values);
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
              if (updateEmailSubmit !== handleSubmit) {
                dispatch(setUpdateEmailSubmit(handleSubmit));
              }
            }, 0);

            return (
              <ViewMargin>
                <ViewMargin>
                  <FormikInput
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                    input={values.email}
                    value={CONSTANTS.Email}
                    label={CONSTANTS.SettingsDots}
                    touched={touched}
                    errors={errors}
                  />

                  <FormikInput
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                    input={values.passwordConfirm}
                    value={CONSTANTS.PasswordConfirm}
                    label={CONSTANTS.SettingsDots}
                    isPassword={true}
                    touched={touched}
                    errors={errors}
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

UpdateEmail.displayName = 'UpdateEmail';

export default UpdateEmail;
