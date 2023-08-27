import { gql } from "@apollo/client";

const SIGN_UP = gql`
mutation SignUp($firstName: String!, $lastName: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    signUp(firstName: $firstName, lastName: $lastName, email: $email, password: $password, confirmPassword: $confirmPassword) {
      id
    }
  }
`

const SIGN_IN = gql`
mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        firstName
        lastName
        email
      }
    }
  }
`

const SIGN_OUT = gql`
mutation Mutation {
  signOut
}
`



export {SIGN_UP, SIGN_IN, SIGN_OUT}