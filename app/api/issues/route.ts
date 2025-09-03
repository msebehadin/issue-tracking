import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../validationSchema";
export async function GET() {
  const issues = prisma.issue.findMany();
  return NextResponse.json(issues);
}
export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    NextResponse.json(validation.error.issues, { status: 400 });
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
      updateTime: body.updateTime,
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
