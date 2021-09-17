import {
  Body,
  ButtonPrimary,
  KeyboardAvoidingViewComponent,
  LinkButton,
  TextPrimary,
  TextSmall,
  ViewMargin,
} from '@components/index';
import { FormikInput } from '@components/input/FormikInput';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@routes/RouteNames';
import {
  login,
  recover,
  selectIsSyncing,
  setError,
} from '@state/auth/AuthReducer';
import { CONSTANTS } from '@utils/constants';
import { loginSchema, oldEmailSchema } from '@utils/validation';
import { Formik } from 'formik';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

interface LoginValues {
  email: string;
  password: string;
}

const Login = memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { isSyncingAuth } = useSelector(selectIsSyncing);

  const [userLogin, setUserLogin] = useState('');

  const handleForgot = () => {
    oldEmailSchema.isValid({ email: userLogin }).then(isValid => {
      if (isValid) dispatch(recover(userLogin));
      else dispatch(setError(t('errorMessages:enterEmail')));
    });
  };

  const handleLogin = useCallback(({ email, password }: LoginValues) => {
    if (isSyncingAuth) return null;

    dispatch(
      login({
        email,
        password,
      }),
    );
  }, []);

  const goToSignup = useCallback(() => {
    navigation.navigate(ROUTES.Signup);
  }, []);

  return (
    <TouchableWithoutFeedback
      accessible={false}
      onPress={() => Keyboard.dismiss()}
    >
      <KeyboardAvoidingViewComponent
        behavior={
          Platform.OS === CONSTANTS.Ios ? CONSTANTS.Padding : CONSTANTS.Height
        }
      >
        <Body>
          <ViewMargin>
            <TextPrimary>{t('login:welcome')}</TextPrimary>
            <TextSmall>{t('login:welcome2')}</TextSmall>
          </ViewMargin>

          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={loginSchema}
            onSubmit={values => {
              handleLogin(values);
            }}
          >
            {({
              handleSubmit,
              handleBlur,
              touched,
              values,
              errors,
              setFieldValue,
            }) => (
              <ViewMargin>
                <FormikInput
                  input={values.email}
                  value={CONSTANTS.Email}
                  label={CONSTANTS.Common}
                  setOutsideValue={setUserLogin}
                  setFieldValue={setFieldValue}
                  handleBlur={handleBlur}
                  touched={touched}
                  errors={errors}
                />

                <FormikInput
                  input={values.password}
                  value={CONSTANTS.Password}
                  label={CONSTANTS.Common}
                  isPassword={true}
                  setFieldValue={setFieldValue}
                  handleBlur={handleBlur}
                  touched={touched}
                  errors={errors}
                />

                <ButtonPrimary
                  title={
                    isSyncingAuth ? t('common:logging') : t('common:login')
                  }
                  onPress={handleSubmit}
                  disabled={isSyncingAuth}
                />

                <LinkButton
                  handlePress={handleForgot}
                  text={t('login:forgot')}
                />

                <LinkButton
                  handlePress={goToSignup}
                  text={t('login:goToSignup')}
                />
              </ViewMargin>
            )}
          </Formik>
        </Body>
      </KeyboardAvoidingViewComponent>
    </TouchableWithoutFeedback>
  );
});

Login.displayName = 'Login';

export default Login;
