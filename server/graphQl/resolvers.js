const userResolvers = require("./resolvers/user");

const resolvers = {
  Query:{
    ...userResolvers.Query
  },
  Mutation:{
    ...userResolvers.Mutation
  }
};

module.exports = { resolvers };