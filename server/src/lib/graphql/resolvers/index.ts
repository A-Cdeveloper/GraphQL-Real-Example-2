import { queryResolvers } from "./queries";
import { mutationResolvers } from "./mutations";

export const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};
