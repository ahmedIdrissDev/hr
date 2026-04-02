'use client'
import React from 'react'
import { SessionProvider } from "next-auth/react"
import { ConvexProvider, ConvexReactClient } from 'convex/react'

interface AuthProviderProps{
    children:React.ReactNode ,
}
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const Provider = ({children }:AuthProviderProps) => {
  return (

       <ConvexProvider client={convex}>{children}</ConvexProvider>

  )
}

export default Provider
