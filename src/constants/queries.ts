import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters($pageNo: Int!) {
    characters(page: $pageNo) {
      info {
        count
      }
      results {
        id
        name
        image
        status
        species
        gender
        origin {
          name
        }
        location {
          name
        }
        episode {
          episode
        }
      }
    }
  }
`;
