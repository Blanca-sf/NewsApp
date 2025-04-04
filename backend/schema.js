const { gql } = require("apollo-server-express");

let savedArticles = [];
// let users = [];
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
        const user = users.find((user) => user.email === email);
        console.log("Looking for user by email:", email);
      
        if (user) {
         
          user.loginCount = (user.loginCount || 0) + 1;
          console.log(" Found user with loginCount updated:", user);
        } else {
          console.log(" User not found");
        }
      
        return user;
      },
      

    savedArticles: (_, { userId }) => {
      const filtered = savedArticles.filter((a) => a.userId === userId);
      return filtered;
    },
  },

  Mutation: {
    addUser: (_, { name, email, username, password }) => {
      const newUser = {
        id: String(Date.now()),
        name,
        email,
        username,
        password,
        loginCount: 0,
        savedArticles: [],
      };
      users.push(newUser);
      console.log(" New user registered:", newUser);
      return newUser;
    },

    saveArticle: (_, { title, url, image, userId }) => {
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
