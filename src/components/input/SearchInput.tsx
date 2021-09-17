import {
  ViewMargin,
  ViewMarginVertical,
  ViewRowCenteredVertical,
} from '@components/views/Views';
import { useNavigation } from '@react-navigation/native';
import { selectTheme } from '@state/theme/ThemeReducer';
import { CONSTANTS } from '@utils/constants';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

interface SearchInterface {
  icon: string;
  setInput?: (e: string) => void;
  onPress?: () => void;
  inputStyle?: { [key: string]: string | number };
  goBack?: boolean | (() => void);
  isGoBack?: boolean;
}

export const SearchInput = (props: SearchInterface) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const inputRef = useRef(null);

  const theme = useSelector(selectTheme);

  const { setInput = null, inputStyle = null, isGoBack = true, icon } = props;

  const focusInput = useCallback(() => {
    inputRef.current.focus();
  }, []);

  const clearInput = useCallback(() => {
    inputRef.current.clear();
    setInput('');
  }, []);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <ViewMarginVertical>
      <ViewRowCenteredVertical>
        {isGoBack ? (
          <ViewMargin>
            <TouchableOpacity onPress={goBack}>
              <MaterialCommunityIcons
                size={30}
                color={theme.colors.grey40}
                name={CONSTANTS.ArrowLeft}
              />
            </TouchableOpacity>
          </ViewMargin>
        ) : null}

        <Icon onPress={focusInput} activeOpacity={1}>
          <MaterialCommunityIcons
            size={30}
            color={theme.colors.grey40}
            name={icon}
          />
        </Icon>

        <Input
          placeholder={t('common:search')}
          onChangeText={input => setInput(input)}
          placeholderTextColor={theme.colors.white20}
          ref={inputRef}
          spellCheck={false}
          autoCorrect={false}
          underlineColorAndroid={CONSTANTS.Transparent}
          selectionColor={theme.colors.white20}
          style={inputStyle}
          autoFocus
        />

        <InputButton>
          <TouchableOpacity onPress={clearInput}>
            <MaterialCommunityIcons
              size={30}
              color={theme.colors.white30}
              name={CONSTANTS.Close}
            />
          </TouchableOpacity>
        </InputButton>
      </ViewRowCenteredVertical>
    </ViewMarginVertical>
  );
};

const Icon = styled.TouchableOpacity`
  z-index: 1;
  margin-left: 20px;
`;

const Input = styled(TextInput)`
  border-radius: 100px;
  font-size: ${props => props.theme.fonts.size.s};
  background-color: ${props => props.theme.colors.secondary};
  margin-left: -50px;
  flex: 1;
  padding: 10px;
  padding-left: 60px;
  margin-right: -50px;
  color: ${props => props.theme.colors.white20};
`;

const InputButton = styled(View)`
  width: 50px;
  padding-top: 5px;
`;
