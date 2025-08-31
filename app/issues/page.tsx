import { prisma } from "@/prisma/client";
import IssueTable from "./_component/issueTable";


const IssuePage = async () => {
  const issues = await prisma.issue.findMany();
  return <IssueTable issues={issues} />;
};

export default IssuePage;
