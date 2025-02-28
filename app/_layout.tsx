import { Fragment } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Slot, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useAppSlice } from '@/store/slices';
import { fetchUser } from '@/services';
import Provider from '@/providers';
import { User } from '@/types';
import { DataPersistKeys, getPersistData, setPersistData } from '@/utils';
import { loadImages, loadFonts } from '@/theme';
import { initializeCashMode } from '@/store/thunks';

SplashScreen.preventAutoHideAsync();

function Router() {
  const router = useRouter();
  const { dispatch, setUser, setLoggedIn } = useAppSlice();

  useEffect(() => {
    //TODO: Update auth base on the requirements
    async function preload() {
      try {
        await Promise.all([loadImages(), loadFonts()]);
        const user = await fetchUser();
        dispatch(setUser(user));
        dispatch(setLoggedIn(!!user));

        if (user) setPersistData<User>(DataPersistKeys.USER, user);

        dispatch(initializeCashMode());

        SplashScreen.hideAsync();
      } catch {
        getPersistData<User>(DataPersistKeys.USER)
          .then(user => {
            if (user) dispatch(setUser(user));
            dispatch(setLoggedIn(!!user));
          })
          .finally(() => {
            SplashScreen.hideAsync();
          });
      }
    }
    preload();
  }, []);

  useEffect(() => {
    router.push('/(main)/sports');
  }, [router]);

  return (
    <Fragment>
      <Slot />
      <StatusBar style="light" />
    </Fragment>
  );
}

export default function RootLayout() {
  return (
    <Provider>
      <Router />
    </Provider>
  );
}
