import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query Query {
    allAuthors {
      name
      id
      born
      books
    }
  }
`;

export const ALL_BOOKS = gql`
  query Query {
    allBooks {
      genres
      title
      published
      author {
        id
        name
      }
      id
    }
  }
`;

export const SUBMIT_BOOK = gql`
  mutation AddBookMutation(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      author {
        name
        id
        born
        books
      }
      id
      genres
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation EditAuthorMutation($born: Int, $name: String) {
    editAuthor(setBornTo: $born, name: $name) {
      name
      id
      born
      books
    }
  }
`;

export const LOGIN = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const FAVORITE_GENRES = gql`
  query Query {
    me {
      favoriteGenres
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      genres
      title
      published
      author {
        id
        name
      }
      id
    }
  }
`;

export const BOOKS_BY_GENRE = gql`
  query Query($genres: [String!]!) {
    allBooks(genres: $genres) {
      title
      author {
        name
        id
        born
        books
      }
      published
      genres
      id
    }
  }
`;
