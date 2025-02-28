import { User } from "@/types/user";

export interface AppState {
  checked: boolean;
  loggedIn: boolean;
  user?: User;
  isCashMode: boolean;
  totalCash: number;
  totalCoin: number;
}

export type Balance = {
  totalCash: number;
  totalCoin: number;
};