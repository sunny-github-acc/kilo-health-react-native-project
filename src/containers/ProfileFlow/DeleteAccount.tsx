import { Body, ViewMargin } from '@components/index';
import { FormikInput } from '@components/input/FormikInput';
import {
  deleteAccount,
  selectDeleteAccountSubmit,
  setDeleteAccountSubmit,
} from '@state/user/UserReducer';
import { CONSTANTS } from '@utils/constants';
import { deleteAccountSchema } from '@utils/validation';
import { Formik } from 'formik';
import React, { memo, useCallback } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

const DeleteAccount = memo(() => {
  const dispatch = useDispatch();

  const deleteAccountSubmit = useSelector(selectDeleteAccountSubmit);

  const handleSubmit = useCallback(({ passwordConfirm }) => {
    dispatch(deleteAccount({ passwordConfirm }));
  }, []);

  return (
    <Body>
      <ScrollView>
        <Formik
          initialValues={{
            passwordConfirm: '',
          }}
          validationSchema={deleteAccountSchema}
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
              if (deleteAccountSubmit !== handleSubmit) {
                dispatch(setDeleteAccountSubmit(handleSubmit));
              }
            }, 0);

            return (
              <ViewMargin>
                <ViewMargin>
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

DeleteAccount.displayName = 'DeleteAccount';

export default DeleteAccount;
