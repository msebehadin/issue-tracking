import { prisma } from "@/prisma/client";
import IssueForm from "../../_component/issueForm";
import { notFound } from "next/navigation";

const UpdateIssue = async ({ params }: { params: { id: string } }) => {
  // Await the params object to ensure it's resolved before use
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt((await params).id) },
  });

  if (!issue) return notFound();

  return (
    <div>
      <IssueForm issue={issue} />
    </div>
  );
};

export default UpdateIssue;