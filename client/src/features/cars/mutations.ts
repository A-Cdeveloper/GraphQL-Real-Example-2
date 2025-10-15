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

export const DELETE_CAR = gql`
  mutation DeleteCar($id: ID!) {
    deleteCar(id: $id) {
      carId
      carName
      brand {
        brandName
      }
    }
  }
`;
