import * as Yup from 'yup';
import i18n from 'i18next';

const email = () => ({
  email: Yup.string()
    .max(256, i18n.t('validation:max256'))
    .email(i18n.t('validation:emailInvalid'))
    .required(i18n.t('validation:emailRequired')),
});

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// const phone = (key: string) => ({
//   [key]: Yup.string()
//      .matches(phoneRegExp, 'Phone number is not valid')
//     .min(1, 'Phone registration is not yet supported')
//     .max(0, 'Phone registration is not yet supported')
//     .required('Required'),
// });

const password = (key: string) => ({
  [key]: Yup.string()
    .min(6, i18n.t('validation:maxPassword6'))
    .max(256, i18n.t('validation:max256'))
    .required(i18n.t('validation:passwordRequired')),
});

const passwordRepeat = (key: string) => ({
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref(key), null], i18n.t('validation:passwordsMustMatch'))
    .required(i18n.t('validation:passwordConfirm')),
});

export const signupSchemaEmail = Yup.object().shape({
  ...email(),
  ...password('password'),
  ...passwordRepeat('password'),
});

// export const signupSchemaPhone = Yup.object().shape(phone('phone'));

export const loginSchema = Yup.object().shape({
  ...email(),
  ...password('password'),
});

export const oldEmailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

export const emailSchema = Yup.object().shape({
  ...email(),
  ...password('passwordConfirm'),
});

export const editProfileSchema = Yup.object().shape({
  username: Yup.string()
    .max(256, i18n.t('validation:max256'))
    .required(i18n.t('validation:usernameRequired')),
  bio: Yup.string().max(256, i18n.t('validation:max256')),
});

// export const phoneSchema = Yup.object().shape(phone('value'));

export const changePasswordSchema = Yup.object().shape({
  ...password('oldPassword'),
  ...password('newPassword'),
  ...passwordRepeat('newPassword'),
});

export const deleteAccountSchema = Yup.object().shape(
  password('passwordConfirm'),
);

export const eventAboutSchema = Yup.object().shape({
  name: Yup.string()
    .max(256, i18n.t('validation:max256'))
    .required(i18n.t('validation:nameRequired')),
  description: Yup.string().max(256, i18n.t('validation:max256')),
});
