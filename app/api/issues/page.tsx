import { prisma } from '@/prisma/client'
import React from 'react'

 async function   Page() {
    const  issues=await prisma.issue.findMany()
  return (
    <div>
          <ul>
              {
                  issues.map((issue: { id: React.Key | null | undefined; title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined }) => (<li key={issue.id}>{issue.title}</li>))
              }
      </ul>
    </div>
  )
}

export default Page
