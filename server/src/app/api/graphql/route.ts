import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "@/lib/graphql/schema";
import { resolvers } from "@/lib/graphql/resolvers";
import { NextRequest } from "next/server";
import { verifyAccessToken } from "@/lib/auth/jwt";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const context = async (req: NextRequest) => {
  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    return { user: null };
  }

  try {
    const user = verifyAccessToken(token);
    console.log("Decoded user:", user);
    return { user };
  } catch (error) {
    console.log("Invalid token:", error);
    return { user: null };
  }
};

const handler = startServerAndCreateNextHandler(server, {
  context,
});

export { handler as GET, handler as POST };
