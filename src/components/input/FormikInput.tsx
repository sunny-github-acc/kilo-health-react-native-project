/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextSmallTertiary, ViewLeft } from '@components/index';
import {
  ViewMarginVertical,
  ViewRowCenteredVertical,
} from '@components/views/Views';
import { selectTheme } from '@state/theme/ThemeReducer';
import { FormikInputInterface } from '@typings/generalTypes';
import { CONSTANTS } from '@utils/constants';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

export const FormikInput = memo((props: FormikInputInterface) => {
  const { t } = useTranslation();

  const theme = useSelector(selectTheme);

  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const {
    multiline = false,
    isPassword = false,
    style = null,
    setOutsideValue = null,
    maxLength = null,
    setFieldValue,
    handleBlur,
    value,
    label,
    input,
    touched,
    errors,
  } = props;

  let icon: string;

  if (isPassword) icon = isPasswordSecure ? CONSTANTS.EyeOff : CONSTANTS.Eye;
  else icon = CONSTANTS.Close;

  const handleOutsideValue = useCallback((e: string) => {
    setOutsideValue(e);
  }, []);

  return (
    <ViewMarginVertical style={style}>
      <ViewNoWrap>
        <TextInputPaper
          onChangeText={e => {
            setFieldValue(value, e);
            if (setOutsideValue) handleOutsideValue(e);
          }}
          value={input}
          label={t(label + value)}
          onBlur={() => handleBlur(value)}
          underlineColor={theme.colors.grey40}
          underlineColorAndroid={CONSTANTS.Transparent}
          secureTextEntry={isPassword ? isPasswordSecure : false}
          theme={{
            ...theme,
            colors: {
              ...theme.colors,
              text: theme.colors.white20,
              primary: theme.colors.white20,
              placeholder: theme.colors.white20,
            },
          }}
          multiline={multiline}
          autoCorrect={false}
          maxLength={maxLength}
        />

        <InputButton>
          <TouchableOpacity
            onPress={
              isPassword
                ? () => setIsPasswordSecure(!isPasswordSecure)
                : () => setFieldValue(value, '')
            }
          >
            <MaterialCommunityIcons
              size={30}
              color={theme.colors.grey40}
              name={icon}
            />
          </TouchableOpacity>
        </InputButton>
      </ViewNoWrap>

      {touched[value] && errors[value] && (
        <ViewLeft>
          <TextSmallTertiary>{errors[value]}</TextSmallTertiary>
        </ViewLeft>
      )}
    </ViewMarginVertical>
  );
});

FormikInput.displayName = 'FormikInput';

const TextInputPaper = styled(TextInput)`
  font-size: ${props => props.theme.fonts.size.s};
  background-color: ${props => props.theme.colors.secondary};
  width: 100%;
  padding: 5px;
  padding-right: 45px;
  font-size: 20px;
`;

const ViewNoWrap = styled(ViewRowCenteredVertical)`
  flex-wrap: nowrap;
`;

const InputButton = styled(View)`
  border-radius: ${props => props.theme.borderRadius};
  position: relative;
  width: 50px;
  left: -50px;
  padding-top: 5px;
`;
