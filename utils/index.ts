import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import CredentialsProvider from "next-auth/providers/credentials";
// import Login from "@/functions";
interface LoginTypes {
    email:string , 
    password: string ,
}
export const authOptions = {
  providers: [
    CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "email", type: "text", placeholder: "kbida@tgcc.teams" },
      password: { label: "password", type: "password", placeholder: "kbida@tgcc.teams" },

    },
    async authorize(credentials, req) {
       const data :LoginTypes  ={
           email: credentials?.email as string ,
           password: credentials?.password as string
       }
        const user =  await fetchQuery(api.user.login  , data)
      if (user) {
        return user
      } else {
         throw new Error('user not fount')

      }
    }
    
  }) ,

  ],
 callbacks: {
 async jwt({ token, user }) {
    if (user) {
      token.user = user  // save user in token
    }
    return token
  },
  async session({ session, token }) {
    session.user = token.user  // attach token user to session
    return session
  }
} ,

secret: process.env.NEXTAUTH_SECRET,
  pages:{
    signIn:'/'
  } ,
  
};

