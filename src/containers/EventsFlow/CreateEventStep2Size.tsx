import {
  ButtonSecondary,
  TextLeft,
  TextSmallBold,
  ViewRowSpaceBetween,
} from '@components/index';
import { selectTheme } from '@state/theme/ThemeReducer';
import { CONSTANTS } from '@utils/constants';
import {
  styleNotSelected,
  styleSelected,
} from '@utils/functions/eventsFunctions';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

interface SizeInterface {
  setFieldValue: (e1: string, e2: string) => void;
  size: string;
}

const CreateEventStep2Size = memo(({ setFieldValue, size }: SizeInterface) => {
  const { t } = useTranslation();

  const theme = useSelector(selectTheme);

  const title = useCallback(
    (text: string) => (
      <TextLeft>
        <TextSmallBold>{t('main:' + text)}</TextSmallBold>
      </TextLeft>
    ),
    [],
  );

  return (
    <>
      {title('size')}

      <ViewRowSpaceBetween>
        {formSize.map(formSize => (
          <ButtonWidth30
            onPress={() => setFieldValue(CONSTANTS.Size, formSize)}
            title={t('main:' + formSize)}
            style={
              size === formSize ? styleSelected(theme) : styleNotSelected(theme)
            }
            key={formSize}
          />
        ))}

        {formSizeNumbers.map(formSize => (
          <ButtonWidth9
            onPress={() => setFieldValue(CONSTANTS.Size, formSize)}
            style={
              size === formSize ? styleSelected(theme) : styleNotSelected(theme)
            }
            key={formSize}
          >
            <TextSmallBold>{formSize}</TextSmallBold>
          </ButtonWidth9>
        ))}
      </ViewRowSpaceBetween>
    </>
  );
});

CreateEventStep2Size.displayName = 'CreateEventStep2Size';

export default CreateEventStep2Size;

const ButtonWidth = styled(ButtonSecondary)`
  width: 100%;
  margin: 10px 0 10px 0;
`;

const ButtonWidth9 = styled(TouchableOpacity)`
  background-color: ${props => props.theme.colors.secondary};
  width: 9%;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const ButtonWidth30 = styled(ButtonWidth)`
  width: 32%;
`;

const formSize = ['1', '4', '10+'];
const formSizeNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'];
