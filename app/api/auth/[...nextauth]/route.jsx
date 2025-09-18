import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async session({ session, token }) {
      // Attach user details to the session for client-side use
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.image = token.picture; // For Google, use 'picture'; for GitHub, it might be 'avatar_url'
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Ensure the auth flow completes and returns to the login page if needed
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login", // Matches your page.jsx route
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
