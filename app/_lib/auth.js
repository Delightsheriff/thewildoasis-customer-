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
};

//exporting the auth object and the GET and POST handlers {Route handlers}
export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authConfig);
