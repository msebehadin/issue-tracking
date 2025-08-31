// app/issues/[id]/edit/page.tsx
import { prisma } from "@/prisma/client";
import IssueForm from "../../_component/issueForm";

const UpdateIssue = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) return <div>Issue not found</div>;

  return (
    <div>
      <IssueForm issue={issue} />
    </div>
  );
};

export default UpdateIssue;
