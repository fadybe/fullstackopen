const { gql } = require("apollo-server");

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    books: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenres: [String!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genres: [String!]): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    editAuthor(name: String, setBornTo: Int): Author
    createUser(
      username: String!
      password: String!
      favoriteGenres: [String!]
    ): User
    login(username: String!, password: String!): Token
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
  }

  type Subscription {
    bookAdded: Book!
  }
`;

module.exports = typeDefs;
