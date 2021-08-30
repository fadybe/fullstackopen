require("dotenv").config();
require("./db");

const { ApolloServer } = require("apollo-server");
const jwt = require("jsonwebtoken");

const typeDefs = require("./typedefs");
const resolvers = require("./resolvers");
const User = require("./models/user");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const authenticationHeader = req ? req.headers.authorization : null;
    if (authenticationHeader && authenticationHeader.startsWith("bearer ")) {
      const decodedToken = jwt.decode(
        authenticationHeader.split("bearer ")[1],
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.userId);

      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
