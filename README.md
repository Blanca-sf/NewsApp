


# NewsApp – GraphQL + React Native

A mobile news reader app built with **React Native**, **GraphQL**, and **Apollo Client/Server**. Users can register, log in (using encrypted passwords), and save articles using an authenticated API with **JWT**.

---

## Security Stack

-  Authentication via email & password (stored hashed using bcrypt)
-  API protected with **JWT tokens**
-  Backend deployed on **AWS EC2** with **HTTPS**
-  Reverse proxy setup using **NGINX**
-  Managed with **PM2** process manager

---

##  Live Backend

Your app communicates with a live backend deployed at: 
https://newsappb.xyz/graphql


 **My EC2 instance must be running** in order to use `Sign Up`, `Sign In`, and interact with the API.

---

## ⚙️ Setup Instructions (Frontend Only)

1. **Clone the project**

git clone 
cd NewsApp

2. **Install dependencies**

npm install

3. **Start Expo**
   
npx expo start


**Tech Stack**

React Native + Expo

GraphQL – Apollo Server & Client

AsyncStorage – for local storage of saved articles

JWT – authentication and authorization

Node.js + Express – backend server

EC2 – cloud hosting via AWS

PM2 – process manager for keeping the server running

NGINX – reverse proxy

Cloudflare – HTTPS + DNS management

Custom Domain – https://newsappb.xyz




**Features**

 Sign Up, Log In,  Guest Access

 Passwords encrypted with bcrypt

 JWT issued on login and used for all secure requests

 Save articles for each user (even offline)

 Fully deployed, secure API for production

