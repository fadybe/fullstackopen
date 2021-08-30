import "./db.js";
import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema.js";
import jwt from "jsonwebtoken";
import User from "./models/user.js";
const JWT_SECRET = "NEED_HERE_A_SECRET_KEY";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.includes("bearer ")) {
      const decodedToken = jwt.verify(auth.split("bearer ")[1], JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id).populate(
        "friends"
      );
      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
