const gql = require("graphql-tag");

const typeDefs = gql`

type Query{
  hello: String
  users:[User]
}

  # User object
  type User {
    id: ID
    firstName:String!
    lastName:String!
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation{
    signUp(firstName: String!,lastName: String!,email: String!, password: String!, confirmPassword: String!): User
    signIn(email: String!, password: String!) :AuthPayload
    signOut: Boolean
    googleLogin(googleCode: String!):AuthPayload
  }

 
`;

module.exports = typeDefs;