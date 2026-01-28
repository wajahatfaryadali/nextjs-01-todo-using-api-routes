import prisma from "@/db/prisma";
import { UserPostValidatorSchema } from "@/lib/zod-validators";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const GET = async (req: NextRequest) => {
  try {
    const allUsers = await prisma.user.findMany({ omit: { password: true } });
    return NextResponse.json(
      { data: allUsers, message: "all users", success: true },
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

// "duck error"
export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();

    const validaedData = UserPostValidatorSchema.parse(data);

    const isUserExist = await prisma.user.findUnique({
      where: { identifier: validaedData.identifier },
    });

    if (isUserExist) {
      return NextResponse.json(
        {
          error: "User already Exists",
          data: data,
          message: "User already Exists",
          success: false,
        },
        { status: 409 }, // 409 user already exist
      );
    }

    const user = await prisma.user.create({ data: data });

    return NextResponse.json(
      { data: user, message: "User", success: true },
      { status: 201 }, // 201 for created
    );
  } catch (error) {
    console.log("error in creating user ******* ", error);

    if (error instanceof z.ZodError) {
      const errors = JSON.parse(error.message)?.map((e) => e.message);

      return NextResponse.json(
        {
          error: errors,
          data: null,
          message: "Invalid Payload",
          success: false,
        },
        { status: 400 }, // 400 for bad request
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error", message: "error", success: false },
      { status: 500 },
    );
  }
};
