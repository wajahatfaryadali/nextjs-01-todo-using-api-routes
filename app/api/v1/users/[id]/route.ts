import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          error: "ID should be valid user id",
          message: "user id is required",
          success: false,
          data: null
        }, { status: 400 })
    }
    const user = await prisma.user.findUnique({
      where: { id: id },
      omit: {
        password: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "User Not Found!",
          data: null,
          message: "not found",
          success: false,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { data: user, message: "user by id", success: true },
      { status: 200 },
    );
  } catch (error) {
    console.log("error getting all users ******* ", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Internal Server Error",
        success: false,
      },
      { status: 500 },
    );
  }
};
