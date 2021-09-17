jest.mock('reactotron-react-native', () => {
  const Reactotron = {
    createSagaMonitor: () => Reactotron,
    useReactNative: () => Reactotron,
    createEnhancer: () => Reactotron,
    configure: () => Reactotron,
    connect: () => Reactotron,
    clear: () => Reactotron,
    use: () => Reactotron,
  };
  return Reactotron;
});
