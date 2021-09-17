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

interface SettingsInterface {
  setFieldValue: (e1: string, e2: string) => void;
  setting: string;
}

const CreateEventStep2Settings = memo(
  ({ setFieldValue, setting }: SettingsInterface) => {
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
        {title('setting')}

        <ViewRowSpaceBetween>
          {formSettings.map(formSetting => (
            <ButtonWidth50
              onPress={() => setFieldValue(CONSTANTS.Setting, formSetting)}
              title={t('main:' + formSetting)}
              style={
                setting === formSetting
                  ? styleSelected(theme)
                  : styleNotSelected(theme)
              }
              key={formSetting}
            />
          ))}

          <ButtonWidth
            onPress={() => setFieldValue(CONSTANTS.Setting, CONSTANTS.Virtual)}
            title={t('main:virtual')}
            style={
              setting === CONSTANTS.Virtual
                ? styleSelected(theme)
                : styleNotSelected(theme)
            }
          />
        </ViewRowSpaceBetween>
      </ViewMarginVertical>
    );
  },
);

CreateEventStep2Settings.displayName = 'CreateEventStep2Settings';

export default CreateEventStep2Settings;

const ButtonWidth = styled(ButtonSecondary)`
  width: 100%;
  margin: 10px 0 10px 0;
`;

const ButtonWidth50 = styled(ButtonWidth)`
  width: 48%;
`;

const formSettings = [CONSTANTS.Indoors, CONSTANTS.Outdoors];
