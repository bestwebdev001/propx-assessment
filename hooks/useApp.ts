import { useDispatch, useSelector } from "react-redux";
import { reset, setBalance, setLoggedIn, setUser } from "@/store/slices/app.slice";
import { initializeCashMode, toggleCashMode } from "@/store/thunks/app.thunk";
import { Balance, User } from "@/types";
import { Dispatch, State } from "@/store";

export function useApp() {
  const dispatch = useDispatch<Dispatch>();
  const state = useSelector(({ app }: State) => app);

  return {
    ...state,
    setLoggedIn: (loggedIn: boolean) => dispatch(setLoggedIn(loggedIn)),
    setUser: (user: User | undefined) => dispatch(setUser(user)),
    setBalance: (balance: Balance) => dispatch(setBalance(balance)),
    reset: () => dispatch(reset()),
    toggleCashMode: () => dispatch(toggleCashMode()),
    initializeCashMode: () => dispatch(initializeCashMode()),
  };
}
