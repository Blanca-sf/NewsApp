import React, { createContext, useContext, useState } from "react";
import { LOGIN_USER } from "../graphql/mutations/userMutations";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = async (email, password) => {
    if (!email || !password) {
      console.log("👥 Guest login");
      setUser({ name: "Guest", email: "", id: "guest" });
      return;
    }

    console.log("⚠️ signIn was called but not needed here in this flow.");
  };

  const setAuthenticatedUser = (userInfo, token) => {
    setUser({
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      username: userInfo.username,
      token,
    });
    console.log("✅ Usuario seteado desde SignInScreen:", userInfo);
  };

  const signUp = (id, email, name, username) => {
    setUser({ id, email, name, username });
    console.log("👤 User registered:", name);
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
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
        signInAsGuest,
        setAuthenticatedUser, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
