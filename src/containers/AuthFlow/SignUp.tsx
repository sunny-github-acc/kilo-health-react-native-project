import {
  Body,
  ButtonPrimary,
  KeyboardAvoidingViewComponent,
  Link,
  LinkButton,
  TextPrimary,
  TextSmall,
  ViewMargin,
  ViewMarginHorizontal,
  ViewMarginVertical,
} from '@components/index';
import { FormikInput } from '@components/input/FormikInput';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@routes/RouteNames';
import { selectIsSyncing, signup } from '@state/auth/AuthReducer';
import { CONSTANTS } from '@utils/constants';
import { signupSchemaEmail } from '@utils/validation';
import { Formik } from 'formik';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

interface SignupInterface {
  email: string;
  password: string;
  passwordRepeat: string;
}

const Signup = memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { isSyncingAuth } = useSelector(selectIsSyncing);

  const policyURL = CONSTANTS.PolicyURL;

  const handleSignUp = useCallback(
    ({ email, password, passwordRepeat }: SignupInterface) => {
      dispatch(
        signup({
          email,
          password,
          passwordRepeat,
        }),
      );
    },
    [],
  );

  const goToLogin = useCallback(() => {
    navigation.navigate(ROUTES.Login);
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
            <ViewMarginVertical>
              <TextPrimary>{t('signup:welcome')}</TextPrimary>
              <TextSmall>{t('signup:welcome2')}</TextSmall>
            </ViewMarginVertical>
          </ViewMargin>

          <ScrollView>
            <Formik
              initialValues={{
                email: '',
                password: '',
                passwordRepeat: '',
              }}
              validationSchema={signupSchemaEmail}
              onSubmit={values => {
                handleSignUp(values);
              }}
            >
              {({
                setFieldValue,
                handleSubmit,
                handleBlur,
                touched,
                values,
                errors,
              }) => (
                <>
                  <ViewMargin>
                    <FormikInput
                      input={values.email}
                      value={CONSTANTS.Email}
                      label={CONSTANTS.Common}
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

                    <FormikInput
                      input={values.passwordRepeat}
                      value={CONSTANTS.PasswordRepeat}
                      label={CONSTANTS.Common}
                      isPassword={true}
                      setFieldValue={setFieldValue}
                      handleBlur={handleBlur}
                      touched={touched}
                      errors={errors}
                    />
                  </ViewMargin>

                  <ViewMarginHorizontal>
                    <ButtonPrimary
                      title={
                        isSyncingAuth ? t('common:logging') : t('common:signup')
                      }
                      onPress={handleSubmit}
                      disabled={isSyncingAuth}
                    />
                  </ViewMarginHorizontal>

                  <Link url={policyURL} text={t('signup:policy')} />

                  <LinkButton
                    handlePress={goToLogin}
                    text={t('signup:goToLogin')}
                  />
                </>
              )}
            </Formik>
          </ScrollView>
        </Body>
      </KeyboardAvoidingViewComponent>
    </TouchableWithoutFeedback>
  );
});

Signup.displayName = 'Signup';

export default Signup;
