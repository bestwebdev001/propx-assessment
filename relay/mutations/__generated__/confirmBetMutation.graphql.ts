/**
 * @generated SignedSource<<da51e268d1ce2772696a867fd24e9408>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type confirmBetMutation$variables = {
  amount: number;
  isCashMode: boolean;
};
export type confirmBetMutation$data = {
  readonly confirmBet: {
    readonly message: string;
    readonly remainingCash: number;
    readonly remainingCoin: number;
    readonly success: boolean;
  };
};
export type confirmBetMutation = {
  response: confirmBetMutation$data;
  variables: confirmBetMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "amount"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "isCashMode"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "amount",
        "variableName": "amount"
      },
      {
        "kind": "Variable",
        "name": "isCashMode",
        "variableName": "isCashMode"
      }
    ],
    "concreteType": "BetResult",
    "kind": "LinkedField",
    "name": "confirmBet",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "success",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "message",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "remainingCash",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "remainingCoin",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "confirmBetMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "confirmBetMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "0db528880b50cffaf96527a4e182b7e4",
    "id": null,
    "metadata": {},
    "name": "confirmBetMutation",
    "operationKind": "mutation",
    "text": "mutation confirmBetMutation(\n  $amount: Float!\n  $isCashMode: Boolean!\n) {\n  confirmBet(amount: $amount, isCashMode: $isCashMode) {\n    success\n    message\n    remainingCash\n    remainingCoin\n  }\n}\n"
  }
};
})();

(node as any).hash = "25b0ba1ba380db09086a8d614c41eda8";

export default node;
