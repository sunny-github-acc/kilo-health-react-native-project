interface EnabledFeatureProps {
  development: boolean;
  production: boolean;
  stage: boolean;
  sysDev: boolean;
  test: boolean;
}

interface Features {
  analytics: boolean;
  branch: boolean;
  reactotron: boolean;
  sentry: boolean;
  localization: boolean;
}

export const getEnabledFeatures = ({
  sysDev,
  test,
  stage,
  production,
  development,
}: EnabledFeatureProps): Features => ({
  analytics: !sysDev && (stage || production),
  branch: !sysDev && (production || stage),
  reactotron: sysDev && (development || stage || production || test),
  sentry: !sysDev && (stage || production),
  localization: false,
});
