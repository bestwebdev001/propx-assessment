export type ConfirmBetVariables = {
  amount: number;
  isCashMode: boolean;
};

export type ConfirmBetResponse = {
  confirmBet: {
    success: boolean;
    message: string;
    remainingCash: number;
    remainingCoin: number;
  };
};

export type ConfirmBetMutation = {
  response: ConfirmBetResponse;
  variables: ConfirmBetVariables;
};
