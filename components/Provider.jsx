'use client'
// because we will be using browser capabilities

import { SessionProvider } from 'next-auth/react';

// it'll be higher order component so that we can wrap other components with it. whihc means that in return statement this component will wrap 'children' prop.
const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider;