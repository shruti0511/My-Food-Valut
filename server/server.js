const express = require('express')
const { gql, ApolloServer } = require('apollo-server-express');
const connectDb = require('./config/db');
const { resolvers } = require('./graphQl/resolvers');
const typeDefs = require('./graphQl/typeDefs');
const cookieParser = require('cookie-parser');
const User = require('./modal/User');
require("dotenv").config();

const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const verifyUser = require('./util/verifyUser');

const port = process.env.PORT || 5500

connectDb()
const app = express();
app.use(cookieParser());
app.use(cors(corsOptions));


async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }) => {
      try {
        const user = await verifyUser(req.headers.authorization || '')
        return { user, res };
      } catch (error) {
        return { res };
      }
    },
  })

  await server.start();
  server.applyMiddleware({ app, cors: false });

  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  })
}

startApolloServer(typeDefs, resolvers);
