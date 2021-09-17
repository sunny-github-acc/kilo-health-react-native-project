import { FormikErrors, FormikTouched } from 'formik';

export interface PayloadAction<T> {
  payload: T;
  type: string;
}
export interface Toggles {
  minAppVersion?: string;
  forceUpdateRequired?: boolean;
}

export interface FormikInterface {
  setOutsideValue?: (e: string) => void;
  setFieldValue: (e1: string, e2: string) => void;
  handleBlur: (e: string) => void;
  touched: FormikTouched<unknown>;
  errors: FormikErrors<unknown>;
  keyboardType?: 'default' | 'numeric';
  routeName?: string;
  input?: string;
  label?: string;
  value?: string;
  password?: string;
  confirmPassword?: string;
  isPassword?: boolean;
}

export interface FormikInputInterface {
  setFieldValue: (e1: string, e2: string) => void;
  handleBlur: (e: string) => void;
  input: string;
  value: string;
  label: string;
  touched: { [key: string]: unknown };
  errors: { [key: string]: unknown };
  setOutsideValue?: (e1: string) => void;
  multiline?: boolean;
  style?: { [key: string]: string | number };
  maxLength?: number;
  isPassword?: boolean;
}
