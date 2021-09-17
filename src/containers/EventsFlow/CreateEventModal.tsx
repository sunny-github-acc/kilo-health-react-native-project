import {
  BodySpaceBetween,
  ButtonPrimary,
  ButtonTransparent,
  StyledDivider,
  TextLeft,
  TextPrimary,
  TextSmallBold,
  ViewMargin,
  ViewMargin20,
  ViewRow,
  ViewRowRight,
} from '@components/index';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@routes/RouteNames';
import { setFab } from '@state/events/EventsReducer';
import { selectTheme } from '@state/theme/ThemeReducer';
import { hideModal, selectModal, setModal } from '@state/user/UserReducer';
import { CONSTANTS } from '@utils/constants';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const CreateEventModal = memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const theme = useSelector(selectTheme);
  const modal = useSelector(selectModal);

  const handleHideModal = useCallback(() => dispatch(hideModal(null)), []);

  const terminateModal = useCallback(() => dispatch(setModal(null)), []);

  const goToMain = useCallback(() => {
    navigation.navigate(ROUTES.Events);

    dispatch(setFab(true));
  }, []);

  if (!modal) return <></>;

  return (
    <BodySpaceBetween>
      <ViewMargin20>
        <ViewRowRight>
          <TouchableOpacity onPress={goToMain}>
            <MaterialCommunityIcons
              size={30}
              color={theme.colors.white30}
              name={CONSTANTS.CloseThick}
            />
          </TouchableOpacity>
        </ViewRowRight>
      </ViewMargin20>

      <ViewMargin>
        <TextLeftWidth>
          <TextPrimary>{t('main:modalMain')}</TextPrimary>
        </TextLeftWidth>

        <StyledDivider />

        <SmallTextContainer>
          <TextSmallBold>· </TextSmallBold>

          <TextLeftWidth>
            <TextSmallBold>{t('main:modalSide1')}</TextSmallBold>
          </TextLeftWidth>
        </SmallTextContainer>

        <SmallTextContainer>
          <TextSmallBold>· </TextSmallBold>

          <TextLeftWidth>
            <TextSmallBold>{t('main:modalSide2')}</TextSmallBold>
          </TextLeftWidth>
        </SmallTextContainer>

        <SmallTextContainer>
          <TextSmallBold>· </TextSmallBold>

          <TextLeftWidth>
            <TextSmallBold>{t('main:modalSide3')}</TextSmallBold>
          </TextLeftWidth>
        </SmallTextContainer>
      </ViewMargin>

      <ViewMargin>
        <ButtonTransparent
          onPress={terminateModal}
          title={t('main:neverShow')}
        />

        <ButtonPrimary onPress={handleHideModal} title={t('main:getStarted')} />

        <ViewMargin20 />
      </ViewMargin>
    </BodySpaceBetween>
  );
});

CreateEventModal.displayName = 'CreateEventModal';

export default CreateEventModal;

const SmallTextContainer = styled(ViewRow)`
  width: 100%;
`;

const TextLeftWidth = styled(TextLeft)`
  max-width: 95%;
`;
