import prisma from "@/db/prisma";
import { errorRes, successRes } from "@/lib/helpers/api-helpers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const allUsers = await prisma.user.findMany({});
    return NextResponse.json(
      successRes({
        data: allUsers,
        message: "all users",
        code: 200,
        success: true,
      }),
    );
  } catch (error) {
    return NextResponse.json(
      errorRes({
        code: 500,
        message: "Internal Server Error",
        success: false,
        error: error,
      }),
    );
  }
};

