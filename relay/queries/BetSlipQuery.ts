import { graphql } from "relay-runtime";

export const BETS_QUERY = graphql`
  query BetSlipQuery {
    bets {
      id
      title
      endTime
      teamLogo
      betOption {
        team
        spread
        odds
      }
    }
    totalCash
    totalCoin
  }
`;