import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as ReduxProvider } from 'react-redux';
import { RelayEnvironmentProvider } from 'react-relay';
import 'react-native-reanimated';
import store from '@/store';
import { PropxThemeProvider } from './PropxThemeProvider';
import { relayEnvironment } from '../relay/environment';

export default function Provider({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <PropxThemeProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ReduxProvider store={store}>
            {children}
          </ReduxProvider>
        </GestureHandlerRootView>
      </PropxThemeProvider>
    </RelayEnvironmentProvider>
  );
}
