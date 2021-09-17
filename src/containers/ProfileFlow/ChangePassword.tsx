import { Body, LinkButton, ViewMargin } from '@components/index';
import { FormikInput } from '@components/input/FormikInput';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { recover } from '@state/auth/AuthReducer';
import {
  selectChangePasswordSubmit,
  setChangePasswordSubmit,
  setPassword,
} from '@state/user/UserReducer';
import { CONSTANTS } from '@utils/constants';
import { changePasswordSchema } from '@utils/validation';
import { Formik } from 'formik';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

const ChangePassword = memo(() => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const changePasswordSubmit = useSelector(selectChangePasswordSubmit);

  const handleSubmit = useCallback(({ oldPassword, newPassword }) => {
    dispatch(setPassword({ oldPassword, newPassword }));

    navigation.goBack();

    dispatch(setChangePasswordSubmit(null));
  }, []);

  const handleForgot = useCallback(() => {
    const email = auth().currentUser.email;

    dispatch(recover(email));
  }, []);

  return (
    <Body>
      <ScrollView>
        <Formik
          initialValues={{
            oldPassword: '',
            newPassword: '',
            passwordRepeat: '',
          }}
          validationSchema={changePasswordSchema}
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
              if (changePasswordSubmit !== handleSubmit) {
                dispatch(setChangePasswordSubmit(handleSubmit));
              }
            }, 0);

            return (
              <ViewMargin>
                <ViewMargin>
                  <FormikInput
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                    input={values.oldPassword}
                    value={CONSTANTS.OldPassword}
                    label={CONSTANTS.SettingsDots}
                    isPassword={true}
                    touched={touched}
                    errors={errors}
                  />

                  <FormikInput
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                    input={values.newPassword}
                    value={CONSTANTS.NewPassword}
                    label={CONSTANTS.SettingsDots}
                    isPassword={true}
                    touched={touched}
                    errors={errors}
                  />

                  <FormikInput
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                    input={values.passwordRepeat}
                    value={CONSTANTS.PasswordRepeat}
                    label={CONSTANTS.SettingsDots}
                    isPassword={true}
                    touched={touched}
                    errors={errors}
                  />

                  <LinkButton
                    handlePress={handleForgot}
                    text={t('settings:forgot')}
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

ChangePassword.displayName = 'ChangePassword';

export default ChangePassword;
