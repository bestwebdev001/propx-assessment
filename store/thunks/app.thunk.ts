import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPersistData, setPersistData, DataPersistKeys } from "@/utils";
import { loadIsCashMode, toggleMode } from "../slices/app.slice";
import { State } from "@/store";

/**
 * Load persisted cash mode from storage
 */
export const initializeCashMode = createAsyncThunk(
  "app/initializeCashMode",
  async (_, { dispatch }) => {
    const storedValue = await getPersistData<boolean>(DataPersistKeys.IS_CASH_MODE);
    if (storedValue !== undefined) {
      dispatch(loadIsCashMode(storedValue));
    }
  }
);

/**
 * Toggle cash mode and persist it
 */
export const toggleCashMode = createAsyncThunk<
void, // Return type
void, // Argument type
{ state: State } // Explicitly specify state type
>(
  "app/toggleCashMode",
  async (_, { getState, dispatch }) => {
    const state = getState(); 

    if (!state.app) {
      throw new Error("Redux state does not contain 'app'");
    }
    const currentMode = state.app.isCashMode;
    const newMode = !currentMode;
    
    await setPersistData(DataPersistKeys.IS_CASH_MODE, newMode);
    dispatch(toggleMode());
  }
);
