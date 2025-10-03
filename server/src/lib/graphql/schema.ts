import { gql } from "graphql-tag";

export const typeDefs = gql`
  # GraphQL schema definition
  # Basic types
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    token: String!
    createdAt: String!
  }

  type Brand {
    brandId: ID!
    brandName: String!
    brandUrl: String!
    cars: [Car!]!
  }

  type Color {
    colorId: ID!
    colorName: String!
    cars: [Car!]!
  }

  type Car {
    carId: ID!
    carName: String!
    imageUrl: String
    price: Float
    fuel: String
    door: Int
    registrationDate: String
    numberOfGears: Int
    color: Color!
    brand: Brand!
  }

  type CarsResponse {
    items: [Car!]!
    total: Int!
    hasMore: Boolean!
    nextOffset: Int
  }

  type BrandsResponse {
    items: [Brand!]!
    total: Int!
  }

  input CreateCarInput {
    inputCarName: String!
    inputImageUrl: String
    inputPrice: Float
    inputFuel: String
    inputDoor: Int
    inputRegistrationDate: String
    inputNumberOfGears: Int
    inputColorId: ID!
    inputBrandId: ID!
  }

  input UpdateCarInput {
    inputCarName: String
    inputImageUrl: String
    inputPrice: Float
    inputFuel: String
    inputDoor: Int
    inputRegistrationDate: String
    inputNumberOfGears: Int
    inputColorId: ID
    inputBrandId: ID
  }

  input CreateBrandInput {
    inputBrandName: String!
    inputBrandUrl: String!
  }

  input UpdateBrandInput {
    inputBrandName: String
    inputBrandUrl: String
  }

  enum SortField {
    carName
    price
    door
    fuel
    numberOfGears
    registrationDate
  }

  enum SortOrder {
    asc
    desc
  }

  input SortInput {
    field: SortField!
    order: SortOrder!
  }

  input FilterInput {
    search: String
  }

  # Queries
  type Query {
    getAllCars(
      limit: Int
      offset: Int
      sort: SortInput
      filter: FilterInput
    ): CarsResponse!
    getCarById(id: ID!): Car!
    getAllBrands: BrandsResponse!
    getBrandById(id: ID!): Brand!
  }

  # Mutations
  type Mutation {
    createCar(input: CreateCarInput!): Car!
    updateCar(id: ID!, input: UpdateCarInput!): Car!
    deleteCar(id: ID!): Car!
    createBrand(input: CreateBrandInput!): Brand!
    updateBrand(id: ID!, input: UpdateBrandInput!): Brand!
    deleteBrand(id: ID!): Brand!
  }
`;
