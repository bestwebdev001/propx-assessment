import { graphql, commitMutation } from 'react-relay';
import { Environment } from 'relay-runtime';
import { ConfirmBetMutation, ConfirmBetResponse, ConfirmBetVariables } from '@/types';

const CONFIRM_BET_MUTATION = graphql`
  mutation confirmBetMutation($amount: Float!, $isCashMode: Boolean!) {
    confirmBet(amount: $amount, isCashMode: $isCashMode) {
      success
      message
      remainingCash
      remainingCoin
    }
  }
`;

export function confirmBet(
  environment: Environment,
  input: ConfirmBetVariables,
): Promise<ConfirmBetResponse> {
  return new Promise((resolve, reject) => {
    commitMutation<ConfirmBetMutation>(environment, {
      mutation: CONFIRM_BET_MUTATION,
      variables: input,
      onCompleted: (response) => resolve(response),
      onError: reject,
    });
  });
}
