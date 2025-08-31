import { prisma } from "@/prisma/client"

interface Props {
  params: { id: string }
}

const Page = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  })

  if (!issue) {
    return <div>Issue not found.</div>
  }

  return (
    <div>
      <p><strong>Title:</strong> {issue.title}</p>
      <p><strong>Description:</strong> {issue.description}</p>
      <p><strong>Created At:</strong> {new Date(issue.createdAt).toLocaleDateString()}</p>
    </div>
  )
}

export default Page
