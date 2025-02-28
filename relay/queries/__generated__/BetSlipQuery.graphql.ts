/**
 * @generated SignedSource<<66accd18be3e98c30c124494dd4a1587>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type BetSlipQuery$variables = Record<PropertyKey, never>;
export type BetSlipQuery$data = {
  readonly bets: ReadonlyArray<{
    readonly betOption: {
      readonly odds: number;
      readonly spread: string;
      readonly team: string;
    };
    readonly endTime: string;
    readonly id: string;
    readonly teamLogo: string;
    readonly title: string;
  }>;
  readonly totalCash: number;
  readonly totalCoin: number;
};
export type BetSlipQuery = {
  response: BetSlipQuery$data;
  variables: BetSlipQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "BetItem",
    "kind": "LinkedField",
    "name": "bets",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "title",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "endTime",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "teamLogo",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "BetOption",
        "kind": "LinkedField",
        "name": "betOption",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "team",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "spread",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "odds",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "totalCash",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "totalCoin",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "BetSlipQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "BetSlipQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "e5bd072a8ae5576d957649185679d159",
    "id": null,
    "metadata": {},
    "name": "BetSlipQuery",
    "operationKind": "query",
    "text": "query BetSlipQuery {\n  bets {\n    id\n    title\n    endTime\n    teamLogo\n    betOption {\n      team\n      spread\n      odds\n    }\n  }\n  totalCash\n  totalCoin\n}\n"
  }
};
})();

(node as any).hash = "c8e0fec354b2e68d72f4d0d977b46472";

export default node;
