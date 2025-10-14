import { gql } from "@apollo/client";

export const CREATE_CAR = gql`
  mutation CreateCar($input: CreateCarInput!) {
    createCar(input: $input) {
      carId
      carName
      price
      door
      fuel
      numberOfGears
      registrationDate
      imageUrl
      color {
        colorName
      }
      brand {
        brandName
      }
    }
  }
`;
