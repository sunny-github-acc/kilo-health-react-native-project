import React, { memo } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigator from './routes/Navigator';
import { configStore } from './state/store';
import { CustomProvider as ThemeProvider } from './themeProvider';

const { store, persistor } = configStore();
export { store };
export const dispatch = store.dispatch;
export const persistedStore = persistor;

const App = memo(() => (
  <Provider store={store}>
    <SafeAreaProvider>
      <ThemeProvider>
        <PaperProvider>
          <PersistGate loading={null} persistor={persistor}>
            <Navigator />
          </PersistGate>
        </PaperProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  </Provider>
));

App.displayName = 'App';

export default App;
