import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID, // Removed !
      clientSecret: process.env.GITHUB_SECRET, // Removed !
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID, // Removed !
      clientSecret: process.env.GOOGLE_SECRET, // Removed !
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      // Assign user details to session
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.image = token.picture; // For Google; use 'avatar_url' for GitHub if needed
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Ensure proper redirect after auth
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
