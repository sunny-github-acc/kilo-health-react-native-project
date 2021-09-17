import { TextPrimary, TextSecondary } from '@components/texts/Texts';
import { selectTheme } from '@state/theme/ThemeReducer';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

interface ButtonsInterface {
  isPhone: boolean;
  setIsPhone: (event: unknown) => void;
}

export const DynamicButtons = ({ isPhone, setIsPhone }: ButtonsInterface) => {
  const { t } = useTranslation();

  const theme = useSelector(selectTheme);

  const setPhoneTrue = useCallback(() => {
    setIsPhone(true);
  }, []);

  const setPhoneFalse = useCallback(() => {
    setIsPhone(false);
  }, []);

  return (
    <ViewButtonBackground>
      <ButtonDynamic
        onPress={setPhoneTrue}
        activeOpacity={0.7}
        isActive={isPhone ? theme.colors.secondary : theme.colors.grey40}
      >
        {isPhone ? (
          <TextPrimary>{t('common:phone')}</TextPrimary>
        ) : (
          <TextSecondary>{t('common:phone')}</TextSecondary>
        )}
      </ButtonDynamic>

      <ButtonDynamic
        onPress={setPhoneFalse}
        activeOpacity={0.7}
        isActive={!isPhone ? theme.colors.secondary : theme.colors.grey40}
      >
        {!isPhone ? (
          <TextPrimary>{t('common:email')}</TextPrimary>
        ) : (
          <TextSecondary>{t('common:email')}</TextSecondary>
        )}
      </ButtonDynamic>
    </ViewButtonBackground>
  );
};

export default DynamicButtons;

interface StyledProps {
  isActive?: string;
}

const ViewButtonBackground = styled(View)<StyledProps>`
  background: ${props => props.theme.colors.grey40};
  border-radius: ${props => props.theme.borderRadius};
  height: ${props => props.theme.height.s};
  margin: 10px;
  flex-direction: row;
`;

const ButtonDynamic = styled(TouchableOpacity)<StyledProps>`
  border-radius: ${props => props.theme.borderRadius};
  height: ${props => props.theme.height.s};
  background: ${props => props.isActive};
  flex: 1;
  justify-content: center;
`;
