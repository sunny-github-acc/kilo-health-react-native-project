/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextPrimary, TextSmallBold } from '@components/texts/Texts';
import { ViewRowSpaceBetween } from '@components/views/Views';
import { useNavigation } from '@react-navigation/native';
import { selectIsSyncing } from '@state/auth/AuthReducer';
import { selectTheme } from '@state/theme/ThemeReducer';
import {
  selectImage,
  setImageTemp,
  uploadImage,
} from '@state/user/UserReducer';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

export const UpdateImageHeader = memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { isSyncingImage } = useSelector(selectIsSyncing);
  const theme = useSelector(selectTheme);
  const image = useSelector(selectImage);

  const goBack = useCallback(() => {
    dispatch(setImageTemp(null));

    navigation.goBack();
  }, []);

  const handleSave = () => {
    if (isSyncingImage) return null;

    dispatch(uploadImage(image.temp));

    navigation.goBack();
  };

  return (
    <Header>
      <Appbar.BackAction onPress={goBack} color={theme.colors.white20} />

      <ViewSpaceBetween>
        <TextPrimary>{t('profile:updateImage')}</TextPrimary>

        <ButtonSave onPress={handleSave}>
          <TextSmallBold>{t('profile:save')}</TextSmallBold>
        </ButtonSave>
      </ViewSpaceBetween>
    </Header>
  );
});

UpdateImageHeader.displayName = 'UpdateImageHeader';

const Header = styled(Appbar.Header)`
  background: ${props => props.theme.colors.secondary};
`;

const ButtonSave = styled(TouchableOpacity)`
  font-weight: ${props => props.theme.fonts.weight.bold};
  border-radius: ${props => props.theme.borderRadius};
  padding: 5px;
  border: 1.2px solid ${props => props.theme.colors.white20};
`;

const ViewSpaceBetween = styled(ViewRowSpaceBetween)`
  flex: 1;
  margin-right: 20px;
`;
