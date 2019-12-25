const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { typeDefs } = require("./graphql/typeDefs");
const { resolvers } = require("./graphql/resolvers");

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

app.head("/health", (req, res) => res.end());

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`🚀  Server ready at http://localhost:4000`);
});
