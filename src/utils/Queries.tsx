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

export const GET_CITIES = gql`
  query allCities($countryId: ID) {
    data: continentscountriescities_Cities(
      where: { country: { have: { objectId: { equalTo: $countryId } } } }
    ) {
      count
      results: edges {
        node {
          objectId
          name
        }
      }
    }
  }
`;
