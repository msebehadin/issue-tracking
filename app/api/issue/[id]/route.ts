import { issueSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
    { params }: { params: { id: string } }
  
)
 {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    NextResponse.json(validation.error.issues, { status: 400 });
 const issue=await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
 });
    const updateIssue = await prisma.issue.update({
        where: { id: issue?.id },
        data: {
            title: issue?.title,
            description:issue?.description
        }
    })
    return NextResponse.json(updateIssue,{status:201})
}
