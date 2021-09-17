import { TextPrimary, TextSmall } from '@components/texts/Texts';
import {
  ViewAlignSelfCentered,
  ViewMargin,
  ViewMarginHorizontal,
  ViewMarginHorizontal05,
  ViewMarginHorizontal20,
  ViewMarginVertical,
  ViewRowCenteredVertical,
  ViewRowRight,
  ViewRowSpaceBetween,
} from '@components/views/Views';
import { selectTheme } from '@state/theme/ThemeReducer';
import { CONSTANTS } from '@utils/constants';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

interface DualButtonsInterface {
  onPress: (event: unknown) => void;
  title: string;
  value?: string;
  color?: string;
  chevron?: boolean;
  disabled?: boolean;
  textStyle?: { [key: string]: string | number };
  icon?: boolean;
}

export const DualButton = (props: DualButtonsInterface) => {
  const theme = useSelector(selectTheme);

  const {
    onPress,
    title,
    value = '',
    color = '',
    chevron = false,
    disabled = false,
    textStyle = null,
    icon = false,
  } = props;

  return (
    <ViewMarginVertical>
      <TouchableWrapper onPress={onPress} disabled={disabled}>
        <ViewRowSpaceBetween>
          <ViewMargin>
            <ViewMarginHorizontal05>
              {color ? (
                <TextPrimary style={{ color, ...textStyle }}>
                  {title}
                </TextPrimary>
              ) : (
                <TextPrimary style={{ ...textStyle }}>{title}</TextPrimary>
              )}
            </ViewMarginHorizontal05>
          </ViewMargin>

          <ViewAlignSelfCentered>
            <ViewRowRight>
              <ViewRowCenteredVertical>
                <ViewMarginHorizontal20>
                  {!disabled ? (
                    <>
                      {icon ? (
                        <MaterialCommunityIcons
                          size={40}
                          color={color ? color : theme.colors.grey40}
                          name={value}
                        />
                      ) : (
                        <TextSmall>{value}</TextSmall>
                      )}
                    </>
                  ) : null}

                  {disabled ? (
                    <ActivityIndicator
                      animating={true}
                      color={color ? color : theme.colors.grey40}
                    />
                  ) : null}
                </ViewMarginHorizontal20>

                {chevron ? (
                  <ViewMarginHorizontal>
                    <MaterialCommunityIcons
                      size={50}
                      color={color ? color : theme.colors.white20}
                      name={CONSTANTS.ChevronRight}
                    />
                  </ViewMarginHorizontal>
                ) : null}
              </ViewRowCenteredVertical>
            </ViewRowRight>
          </ViewAlignSelfCentered>
        </ViewRowSpaceBetween>
      </TouchableWrapper>
    </ViewMarginVertical>
  );
};

const TouchableWrapper = styled(TouchableOpacity)`
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.colors.secondary};
  border: ${props => props.theme.colors.primary};
  padding-vertical: 10px;
`;
