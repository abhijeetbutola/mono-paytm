import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
};
