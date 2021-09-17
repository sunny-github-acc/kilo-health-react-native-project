import {
  ButtonSecondary,
  TextLeft,
  TextSmallBold,
  ViewMarginVertical,
  ViewRowSpaceBetween,
} from '@components/index';
import { selectTheme } from '@state/theme/ThemeReducer';
import { CONSTANTS } from '@utils/constants';
import {
  handleFormType,
  styleNotSelected,
  styleSelected,
} from '@utils/functions/eventsFunctions';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

interface TypesInterface {
  setFieldValue: (e1: string, e2: string) => void;
  type: string;
}

const CreateEventStep2Types = memo(
  ({ setFieldValue, type }: TypesInterface) => {
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
      <ViewMarginVertical>
        {title('type')}

        <ViewRowSpaceBetween>
          {formTypes.map(formType => (
            <ButtonWidth50
              onPress={() =>
                handleFormType({
                  setFieldValue,
                  type,
                  value: formType,
                })
              }
              title={t('main:' + formType)}
              style={
                type.includes(formType)
                  ? styleSelected(theme)
                  : styleNotSelected(theme)
              }
              key={formType}
            />
          ))}
        </ViewRowSpaceBetween>
      </ViewMarginVertical>
    );
  },
);

CreateEventStep2Types.displayName = 'CreateEventStep2Types';

export default CreateEventStep2Types;

const ButtonWidth = styled(ButtonSecondary)`
  width: 100%;
  margin: 10px 0 10px 0;
`;

const ButtonWidth50 = styled(ButtonWidth)`
  width: 48%;
`;

const formTypes = [
  CONSTANTS.Active,
  CONSTANTS.Growth,
  CONSTANTS.Fun,
  CONSTANTS.Other,
];
