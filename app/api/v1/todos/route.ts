import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ status: 200, data: todos });
  } catch (error) {
    console.log("error getting all todos ******** ", error);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 },
    );
  }
};
export const POST = (req: NextRequest) => {};
export const DELETE = (req: NextRequest) => {};
export const PUT = (req: NextRequest) => {};
