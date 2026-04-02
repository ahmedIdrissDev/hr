import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      <Link href={'/sign-in'} >login</Link>
    </div>
  )
}

export default page