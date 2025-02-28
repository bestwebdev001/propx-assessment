import { useDispatch, useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State, Dispatch } from '@/store';
import { User } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, Balance } from '@/types/app';

const initialState: AppState = {
  checked: false,
  loggedIn: false,
  user: undefined,
  isCashMode: false,
  totalCash: 0,
  totalCoin: 0
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoggedIn: (state: AppState, { payload }: PayloadAction<boolean>) => {
      state.checked = true;
      state.loggedIn = payload;
    },
    setUser: (state: AppState, { payload }: PayloadAction<User | undefined>) => {
      state.user = payload;
    },
    toggleMode: (state: AppState) => {
      state.isCashMode = !state.isCashMode;
    },
    loadIsCashMode: (state: AppState, { payload }: PayloadAction<boolean>) => {
      state.isCashMode = payload;
    },
    setBalance: (
      state: AppState,
      { payload }: PayloadAction<Balance>
    ) => {
      state.totalCash = payload.totalCash;
      state.totalCoin = payload.totalCoin;
    },
    reset: () => {
      return {...initialState};
    },
  },
});

export function useAppSlice() {
  const dispatch = useDispatch<Dispatch>();
  const state = useSelector(({ app }: State) => app);
  return { dispatch, ...state, ...slice.actions };
}

export async function loadStoredIsCashMode(dispatch: Dispatch): Promise<void> {
  try {
    const storedValue = await AsyncStorage.getItem('isCashMode');
    if (storedValue !== null) {
      dispatch(slice.actions.loadIsCashMode(JSON.parse(storedValue)));
    }
  } catch (error) {
    console.error('Failed to load isCashMode:', error);
  }
}

export const { setLoggedIn, setUser, toggleMode, loadIsCashMode, setBalance, reset } = slice.actions;
export default slice.reducer;
