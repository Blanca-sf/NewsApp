import React, { createContext, useContext, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_BY_EMAIL } from "../graphql/queries/userQueries";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [getUserByEmail] = useLazyQuery(GET_USER_BY_EMAIL);

  const signIn = async (email, password) => {
    if (!email || !password) {
      console.log(" Guest login");
      setUser({ name: "Guest", email: "", id: "guest" });
      return;
    }

    try {
      const { data } = await getUserByEmail({ variables: { email } });
      const userFound = data?.userByEmail;

      if (!userFound) {
        console.log(" Email not found");
        return;
      }

      if (userFound.password !== password) {
        console.log(" Incorrect password");
        return;
      }

      userFound.loginCount = (userFound.loginCount || 0) + 1;

      setUser({
        id: userFound.id,
        name: userFound.name,
        email: userFound.email,
        username: userFound.username,
      });

      console.log(" Login successful:", userFound);
    } catch (error) {
      console.error(" Error during login:", error.message);
    }
  };

  const signUp = (id, email, name, username) => {
    setUser({ id, email, name, username });
    console.log(" User registered:", name);
  };

  const signOut = () => setUser(null);

  const signInAsGuest = () => {
    setUser({
      id: "guest-id",
      isGuest: true,
      name: "Guest",
      email: "guest@demo.com",
    });
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, signInAsGuest }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
