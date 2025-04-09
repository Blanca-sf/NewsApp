const { gql } = require("apollo-server-express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;


let savedArticles = [];

let users = [
  {
    id: "1",
    name: "Alice John",
    email: "alice@example.com",
    username: "alicej",
    password: "test123!@#",
    loginCount: 5,
    savedArticles: [],
  },
  {
    id: "2",
    name: "Bob Martin",
    email: "bob@example.com",
    username: "bobm",
    password: "bob123!@#",
    loginCount: 3,
    savedArticles: [],
  },
  {
    id: "3",
    name: "Carla Lee",
    email: "carla@example.com",
    username: "carla123",
    password: "carla123!@#",
    loginCount: 7,
    savedArticles: [],
  },
];

const typeDefs = gql`
  type User {
    id: ID!
    name: String
    email: String
    username: String
    password: String
    loginCount: Int
    savedArticles: [SavedArticle]
  }

  type SavedArticle {
    id: ID!
    title: String!
    url: String!
    image: String
    userId: ID!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    users: [User]
    userByEmail(email: String!): User
    savedArticles(userId: ID!): [SavedArticle]
  }

  type Mutation {
    addUser(
      name: String!
      email: String!
      username: String!
      password: String!
    ): User

    loginUser(
      email: String!
      password: String!
    ): AuthPayload

    saveArticle(
      title: String!
      url: String!
      image: String
      userId: ID!
    ): SavedArticle

    deleteSavedArticle(id: ID!): Boolean
  }
`;

const resolvers = {
  Query: {
    users: () => users,

userByEmail: (_, { email }) => {
  return users.find((user) => user.email === email);
},


    savedArticles: (_, { userId }) => {
      const filtered = savedArticles.filter((a) => a.userId === userId);
      return filtered;
    },
  },

  Mutation: {
    addUser: async (_, { name, email, username, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        id: String(Date.now()),
        name,
        email,
        username,
        password: hashedPassword,
        loginCount: 0,
        savedArticles: [],
      };

      users.push(newUser);
      console.log("🔐 New user registered with hashed password:", newUser);
      return newUser;
    },

loginUser: async (_, { email, password }) => {
  const user = users.find((u) => u.email === email);
  if (!user) throw new Error("User not found");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    console.log("❌ Incorrect password for:", email);
    throw new Error("Incorrect password");
  }

  user.loginCount = (user.loginCount || 0) + 1;

  const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });
  console.log("✅ JWT issued:", token);

  return {
    token,
    user,
  };
},

    saveArticle: (_, { title, url, image, userId }, context) => {
      const authHeader = context.req.headers.authorization || "";
      const token = authHeader.replace("Bearer ", "");

      try {
        const payload = jwt.verify(token, SECRET_KEY);
        if (payload.userId !== userId) throw new Error("Not authorized");
      } catch (err) {
        throw new Error("Invalid token");
      }

      const newArticle = {
        id: String(Date.now()),
        title,
        url,
        image,
        userId,
      };

      savedArticles.push(newArticle);
      return newArticle;
    },

    deleteSavedArticle: (_, { id }) => {
      savedArticles = savedArticles.filter((article) => article.id !== id);
      return true;
    },
  },
};

module.exports = { typeDefs, resolvers };
