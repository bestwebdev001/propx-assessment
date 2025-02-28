const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { gql } = require('graphql-tag');

const typeDefs = gql`
  type BetOption {
    team: String!
    spread: String!
    odds: Int!
  }

  type BetItem {
    id: ID!
    title: String!
    endTime: String!
    teamLogo: String!
    betOption: BetOption!
  }

  type BetResult {
    success: Boolean!
    message: String!
    remainingCash: Float!
    remainingCoin: Int!
  }

  type Query {
    bets: [BetItem!]!
    totalCash: Float!
    totalCoin: Int!
  }

  type Mutation {
    confirmBet(amount: Float!, isCashMode: Boolean!): BetResult!
  }
`;

let totalCash = 200000.0;
let totalCoin = 12000000;

const resolvers = {
  Query: {
    bets: () => [
      {
        id: "1",
        title: "Warriors vs Bucks",
        endTime: "2025-02-26T01:00:00Z",
        teamLogo: "🏀",
        betOption: {
          team: "Warriors",
          spread: "-3.5",
          odds: -120,
        },
      },
      {
        id: "2",
        title: "Hornets vs Kings",
        endTime: "2025-02-26T03:00:00Z",
        teamLogo: "⚽",
        betOption: {
          team: "Kings Moneyline",
          spread: "0",
          odds: +140,
        },
      },
    ],
    totalCash: () => totalCash,
    totalCoin: () => totalCoin,
  },
  Mutation: {
    confirmBet: (_, { amount, isCashMode }) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (isCashMode) {
            if (amount > totalCash) {
              resolve({ success: false, message: "Insufficient cash balance", remainingCash: totalCash, remainingCoin: totalCoin });
              return;
            }
            totalCash -= amount;
          } else {
            if (amount > totalCoin) {
              resolve({ success: false, message: "Insufficient coin balance", remainingCash: totalCash, remainingCoin: totalCoin });
              return;
            }
            totalCoin -= amount;
          }
  
          resolve({ success: true, message: "Bet placed successfully", remainingCash: totalCash, remainingCoin: totalCoin });
        }, 2000); // ⏳ Simulate delay of 2 seconds
      });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, { listen: { port: 4000 } }).then(({ url }) => {
  console.log(`🚀 Mock GraphQL server ready at ${url}`);
});
