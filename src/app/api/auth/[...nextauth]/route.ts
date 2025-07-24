import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

// Input validation helper
const validateInput = (input: any): boolean => {
  if (!input || typeof input !== 'object') return false;
  return true;
};

// Sanitize user data
const sanitizeUserData = (user: any) => {
  if (!user) return null;
  
  return {
    id: user.id,
    name: user.name || user.login,
    email: user.email,
    image: user.avatar_url || user.image,
    githubId: user.id,
    githubUsername: user.login,
  };
};

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: {
          scope: 'read:user user:email',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      try {
        // Validate inputs
        if (!validateInput(token)) {
          console.error('Invalid token in JWT callback');
          return token;
        }

        // Persist the OAuth access_token and or the user id to the token right after signin
        if (account && validateInput(account)) {
          token.accessToken = account.access_token;
          token.githubId = (profile as any)?.id;
          token.githubUsername = (profile as any)?.login;
        }
        return token;
      } catch (error) {
        console.error('Error in JWT callback:', error);
        return token;
      }
    },
    async session({ session, token }) {
      try {
        // Validate inputs
        if (!validateInput(session) || !validateInput(token)) {
          console.error('Invalid session or token in session callback');
          return session;
        }

        // Send properties to the client, like an access_token and user id from a provider.
        session.accessToken = token.accessToken;
        session.user = {
          ...session.user,
          githubId: token.githubId,
          githubUsername: token.githubUsername,
        };
        return session;
      } catch (error) {
        console.error('Error in session callback:', error);
        return session;
      }
    },
    async signIn({ user, account, profile }) {
      try {
        // Validate inputs
        if (!validateInput(user) || !validateInput(account) || !validateInput(profile)) {
          console.error('Invalid user, account, or profile in signIn callback');
          return false;
        }

        // You can add custom logic here to handle the sign-in process
        // For example, save user data to your database
        if (account?.provider === 'github') {
          // Sanitize user data before logging
          const sanitizedUser = sanitizeUserData(profile);
          console.log('GitHub user signed in:', sanitizedUser);
        }
        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      try {
        // Validate inputs
        if (!url || !baseUrl) {
          console.error('Invalid URL in redirect callback');
          return baseUrl;
        }

        // Allows relative callback URLs
        if (url.startsWith("/")) return `${baseUrl}${url}`
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) return url
        return baseUrl
      } catch (error) {
        console.error('Error in redirect callback:', error);
        return baseUrl;
      }
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 60 * 60, // 1 hour
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  logger: {
    error(code, ...message) {
      console.error(`[NextAuth] Error ${code}:`, ...message);
    },
    warn(code, ...message) {
      console.warn(`[NextAuth] Warning ${code}:`, ...message);
    },
    debug(code, ...message) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[NextAuth] Debug ${code}:`, ...message);
      }
    },
  },
});

export { handler as GET, handler as POST }; 