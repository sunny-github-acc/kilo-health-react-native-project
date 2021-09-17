import { ViewRowCentered } from '@components/views/Views';
import { selectTheme } from '@state/theme/ThemeReducer';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

interface ButtonInterface {
  onPress: (event: unknown) => void;
  title: string;
  disabled?: boolean;
  style?: { [key: string]: string | number };
  styleText?: { [key: string]: string | number };
}

export const ButtonPrimary = (props: ButtonInterface) => {
  const theme = useSelector(selectTheme);

  const {
    title,
    onPress,
    disabled = false,
    style = null,
    styleText = null,
  } = props;

  return (
    <TouchableWrapper style={style} onPress={onPress} disabled={disabled}>
      <ViewRowCentered>
        {disabled ? (
          <ActivityIndicator animating={true} color={theme.colors.white20} />
        ) : null}

        <ButtonText style={styleText}>{title}</ButtonText>
      </ViewRowCentered>
    </TouchableWrapper>
  );
};

export const ButtonSecondary = (props: ButtonInterface) => {
  const { title, onPress, style = null, disabled = false } = props;

  return (
    <TouchableWrapperSecondary
      style={style}
      onPress={onPress}
      disabled={disabled}
    >
      <ButtonText>{title}</ButtonText>
    </TouchableWrapperSecondary>
  );
};

export const ButtonTransparent = (props: ButtonInterface) => {
  const {
    onPress,
    title,
    style = null,
    styleText = null,
    disabled = false,
  } = props;

  return (
    <TouchableWrapperTransparent
      style={style}
      onPress={onPress}
      disabled={disabled}
    >
      <ButtonText style={styleText}>{title}</ButtonText>
    </TouchableWrapperTransparent>
  );
};

const ButtonText = styled(Text)`
  font-size: ${props => props.theme.fonts.size.m};
  font-weight: ${props => props.theme.fonts.weight.bold};
  color: ${props => props.theme.colors.white20};
  text-align: center;
  margin: 10px;
  padding-right: 5px;
  padding-left: 5px;
`;

const TouchableWrapper = styled(TouchableOpacity)`
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.colors.secondary};
  margin-vertical: 10px;
  padding-vertical: 5px;
`;

const TouchableWrapperSecondary = styled(TouchableWrapper)`
  background-color: ${props => props.theme.colors.secondary};
`;

const TouchableWrapperTransparent = styled(TouchableWrapper)`
  background-color: transparent;
`;
