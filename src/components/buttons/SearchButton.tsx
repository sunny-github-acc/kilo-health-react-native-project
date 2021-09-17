import { ViewMarginHorizontal05 } from '@components/views/Views';
import { selectTheme } from '@state/theme/ThemeReducer';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

interface ButtonInterface {
  onPress: () => void;
  icon: string;
  title: string;
  style?: { [key: string]: string | number };
}

export const SearchButton = (props: ButtonInterface) => {
  const theme = useSelector(selectTheme);

  const { onPress, title, icon, style = null } = props;

  return (
    <TouchableWrapper onPress={onPress} style={style}>
      {icon ? (
        <ViewMarginHorizontal05>
          <MaterialCommunityIcons
            size={30}
            color={theme.colors.grey40}
            name={icon}
          />
        </ViewMarginHorizontal05>
      ) : null}
      {title ? <ButtonTitle>{title}</ButtonTitle> : null}
    </TouchableWrapper>
  );
};

const ButtonTitle = styled(Text)`
  font-size: ${props => props.theme.fonts.size.s};
  font-weight: ${props => props.theme.fonts.weight.bold};
  color: ${props => props.theme.colors.grey40};
  margin-left: 5px;
  margin-right: 5px;
`;

const TouchableWrapper = styled(TouchableOpacity)`
  background-color: ${props => props.theme.colors.secondary};
  flex-direction: row;
  align-items: center;
  border-radius: 100px;
  margin-top: 10px;
  margin-bottom: 0;
  padding: 10px;
  padding-right: 20px;
  padding-left: 20px;
`;
