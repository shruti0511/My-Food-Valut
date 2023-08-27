import { gql } from "@apollo/client";   

const GET_DEMO = gql`
query Query {
  hello
}
`;

export {GET_DEMO}