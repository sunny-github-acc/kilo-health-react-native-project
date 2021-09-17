import { selectEvent } from '@state/events/EventsReducer';
import React, { memo, useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';

const EventTopImage = memo(() => {
  const event = useSelector(selectEvent);

  const uri = event?.image?.uri;

  const imgHeight = useSharedValue(0);
  const imgOffset = useSharedValue(0);

  const animationConfig = {
    duration: 1000,
    easing: Easing.out(Easing.exp),
  };

  const heightAnimationStyle = useAnimatedStyle(
    () => ({
      height: imgHeight.value,
    }),
    [],
  );

  const topAnimationStyle = useAnimatedStyle(
    () => ({
      top: imgOffset.value,
    }),
    [],
  );

  useEffect(() => {
    if (uri) {
      setTimeout(() => {
        imgHeight.value = withTiming(200, animationConfig);
        imgOffset.value = withTiming(0, animationConfig);
      }, 0);
    }
  }, [uri]);

  return (
    <>
      {uri ? (
        <Animated.View style={[heightAnimationStyle, { overflow: 'hidden' }]}>
          <Animated.Image
            style={[topAnimationStyle, imageStyle]}
            source={{
              uri,
            }}
          />
        </Animated.View>
      ) : null}
    </>
  );
});

EventTopImage.displayName = 'EventTopImage';

export default EventTopImage;

const imageStyle = { height: 200, width: '100%' };
