const { UserInputError, AuthenticationError } = require("apollo-server");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: () => Book.count({}),
    authorCount: () => Author.count({}),
    allBooks: async (root, args) => {
      if (Object.keys(args).length === 0) return Book.find({});
      const filter = {};
      if (args.genres) filter.genres = { $in: args.genres };
      if (args.author) filter.author = args.author;
      const books = await Book.find(filter);
      return books;
    },
    allAuthors: async (root, args) => {
      const all = await Author.aggregate()
        .match({})
        .lookup({
          from: "books",
          localField: "_id",
          foreignField: "author",
          as: "books",
        })
        .project({
          _id: 0,
          id: "$_id",
          name: 1,
          born: 1,
          books: { $size: "$books" },
        });
      return all;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Book: {
    author: async (root) => {
      const author = await Author.findById(root.author);
      author.books = await Book.count({ author: author._id });
      return author;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const book = await Book.findOne({ title: args.title });

      if (book) {
        throw new UserInputError("Book with that title already exists", {
          invalidArgs: args.title,
        });
      }

      const author = await Author.findOne({ name: args.author });

      if (!author) {
        const newAuthor = new Author({ name: args.author });
        try {
          await newAuthor.save();
        } catch (error) {
          throw new UserInputError(error.message);
        }
      }

      const bookAuthor = await Author.findOne({ name: args.author });

      const newBook = new Book({ ...args, author: bookAuthor._id });
      try {
        await newBook.save();
      } catch (error) {
        throw new UserInputError(error.message);
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: newBook });

      return newBook;
    },
    editAuthor: async (root, args) => {
      const foundAuthor = await Author.findOne({ name: args.name });

      if (!foundAuthor) return null;

      if (args.setBornTo) foundAuthor.born = args.setBornTo;
      try {
        await foundAuthor.save();
      } catch (error) {
        throw new UserInputError(error.message);
      }

      return {
        name: foundAuthor.name,
        id: foundAuthor._id,
        born: foundAuthor.born,
        books: await Book.count({ author: foundAuthor._id }),
      };
    },
    login: async (root, args) => {
      const { username, password } = args;
      const user = await User.findOne({ username });
      if (!user) throw new UserInputError("Wrong Credentials");
      const correctPassword = await bcrypt.compare(password, user.password);
      if (!correctPassword) throw new UserInputError("Wrong Credentials");
      return {
        value: jwt.sign({ userId: user._id, username }, process.env.JWT_SECRET),
      };
    },
    createUser: async (root, args) => {
      const { username, password, favoriteGenres } = args;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        username,
        password: hashedPassword,
        favoriteGenres,
      });

      try {
        await user.save();
        return user;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
  Subscription: {
    bookAdded: { subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]) },
  },
};

module.exports = resolvers;
