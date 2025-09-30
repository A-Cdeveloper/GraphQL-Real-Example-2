import { gql } from "@apollo/client";

export const GET_ALL_CARS = gql`
  query GetAllCars {
    getAllCars {
      total
      items {
        carId
        carName
        brand {
          brandId
          brandName
          brandUrl
        }
        color {
          colorId
          colorName
        }
      }
    }
  }
`;
