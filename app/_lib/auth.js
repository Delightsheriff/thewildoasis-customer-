import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

//setting up google authentication

//the authConfig object is used to configure the authentication providers
const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user; //if the user is authenticated, return true else false
    },
  },
  pages: {
    signIn: "/login", //redirect to login page
  },
};

//exporting the auth object and the GET and POST handlers {Route handlers}
export const {
  auth, //used to collect current session information also used to check if the user is authenticated or not
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth(authConfig);
