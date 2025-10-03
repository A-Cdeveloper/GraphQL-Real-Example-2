import { gql } from "@apollo/client";

export const GET_ALL_CARS = gql`
  query GetAllCars(
    $limit: Int
    $offset: Int
    $sort: SortInput
    $filter: FilterInput
  ) {
    getAllCars(limit: $limit, offset: $offset, sort: $sort, filter: $filter) {
      total
      hasMore
      nextOffset
      items {
        carId
        carName
        imageUrl
        price
        fuel
        door
        registrationDate
        numberOfGears
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

export const GET_CAR_BY_ID = gql`
  query GetCarById($id: ID!) {
    getCarById(id: $id) {
      carId
      carName
      imageUrl
      price
      fuel
      door
      registrationDate
      numberOfGears
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
`;
