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

interface AudiencehInterface {
  setFieldValue: (e1: string, e2: string) => void;
  audience: string;
}

const CreateEventStep2Audience = memo(
  ({ setFieldValue, audience }: AudiencehInterface) => {
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
        {title('audience')}

        <ViewRowSpaceBetween>
          {formAudience.map(formAudience => (
            <ButtonWidth50
              onPress={() => setFieldValue(CONSTANTS.Audience, formAudience)}
              title={t('main:' + formAudience)}
              style={
                audience === formAudience
                  ? styleSelected(theme)
                  : styleNotSelected(theme)
              }
              key={formAudience}
            />
          ))}
        </ViewRowSpaceBetween>
      </ViewMarginVertical>
    );
  },
);

CreateEventStep2Audience.displayName = 'CreateEventStep2Audience';

export default CreateEventStep2Audience;

const ButtonWidth = styled(ButtonSecondary)`
  width: 100%;
  margin: 10px 0 10px 0;
`;

const ButtonWidth50 = styled(ButtonWidth)`
  width: 48%;
`;

const formAudience = [
  CONSTANTS.All,
  CONSTANTS.Men,
  CONSTANTS.Women,
  CONSTANTS.Family,
];
