import { TextSmallBold } from '@components/texts/Texts';
import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface ButtonInterface {
  onPress: (event: unknown) => void;
  title: string;
  disabled?: boolean;
}

interface ButtonIconInterface {
  onPress: (event: unknown) => void;
  icon: string;
  disabled?: boolean;
  color: string;
}

export const OutlinedButton = memo(
  ({ onPress, title, disabled = false }: ButtonInterface) => (
    <ButtonEdit onPress={onPress} disabled={disabled}>
      <TextSmallBold>{title}</TextSmallBold>
    </ButtonEdit>
  ),
);

export const ButtonIcon = memo(
  ({ onPress, icon, color, disabled = false }: ButtonIconInterface) => (
    <ButtonNoBorder onPress={onPress} disabled={disabled}>
      <MaterialCommunityIcons size={50} color={color} name={icon} />
    </ButtonNoBorder>
  ),
);

OutlinedButton.displayName = 'OutlinedButton';
ButtonIcon.displayName = 'ButtonIcon';

const ButtonEdit = styled(TouchableOpacity)`
  font-weight: ${props => props.theme.fonts.weight.bold};
  border-radius: ${props => props.theme.borderRadius};
  padding: 5px;
  border: 1.2px solid ${props => props.theme.colors.white20};
`;

const ButtonNoBorder = styled(ButtonEdit)`
  border: 0;
`;
