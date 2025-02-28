import { BetSlipQuery } from "@/relay/queries/__generated__/BetSlipQuery.graphql";

export type BetItem = NonNullable<BetSlipQuery['response']['bets']>[number] & { betValue: string };
