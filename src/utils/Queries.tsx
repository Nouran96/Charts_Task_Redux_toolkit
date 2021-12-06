import { gql } from "@apollo/client";

export const GET_CONTINENTS = gql`
  query allContinents {
    data: continentscountriescities_Continents(order: [name_ASC]) {
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
      order: [name_ASC]
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
      order: [population_DESC]
    ) {
      count
      results: edges {
        node {
          objectId
          name
          population
        }
      }
    }
  }
`;

export const GET_COUNTRY = gql`
  query countryDetails($countryId: ID!) {
    data: continentscountriescities_Country(id: $countryId) {
      objectId
      name
      code
      capital
      currency
    }
  }
`;

export const GET_CITY = gql`
  query cityDetails($cityId: ID!) {
    data: continentscountriescities_City(id: $cityId) {
      objectId
      name
      location {
        latitude
        longitude
      }
      population
    }
  }
`;
