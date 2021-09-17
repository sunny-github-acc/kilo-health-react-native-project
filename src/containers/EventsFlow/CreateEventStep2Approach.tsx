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
  styleNotSelected,
  styleSelected,
} from '@utils/functions/eventsFunctions';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

interface ApproachInterface {
  setFieldValue: (e1: string, e2: string) => void;
  approach: string;
}

const CreateEventStep2Approach = memo(
  ({ setFieldValue, approach }: ApproachInterface) => {
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
        {title('approach')}

        <ViewRowSpaceBetween>
          {formApproach.map(formApproach => (
            <ButtonWidth50
              onPress={() => setFieldValue(CONSTANTS.Approach, formApproach)}
              title={t('main:' + formApproach)}
              style={
                approach === formApproach
                  ? styleSelected(theme)
                  : styleNotSelected(theme)
              }
              key={formApproach}
            />
          ))}
        </ViewRowSpaceBetween>
      </ViewMarginVertical>
    );
  },
);

CreateEventStep2Approach.displayName = 'CreateEventStep2Approach';

export default CreateEventStep2Approach;

const ButtonWidth = styled(ButtonSecondary)`
  width: 100%;
  margin: 10px 0 10px 0;
`;

const ButtonWidth50 = styled(ButtonWidth)`
  width: 48%;
`;

const formApproach = [CONSTANTS.Pro, CONSTANTS.Casual];
