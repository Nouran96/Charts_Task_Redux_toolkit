import { gql } from "@apollo/client";

export const GET_CONTINENTS = gql`
  query allContinents {
    data: continentscountriescities_Continents {
      count
      results: edges {
        node {
          objectId
          name
          children: countries {
            count
          }
        }
      }
    }
  }
`;

export const GET_COUNTRIES = gql`
  query allCountries($continentId: ID) {
    data: continentscountriescities_Countries(
      where: { continent: { have: { objectId: { equalTo: $continentId } } } }
    ) {
      count
      results: edges {
        node {
          objectId
          name
          children: cities {
            count
          }
        }
      }
    }
  }
`;
