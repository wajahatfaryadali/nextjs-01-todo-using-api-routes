import prisma from "@/db/prisma";
import { LoginPayloadValidatorSchema } from "@/lib/zod-validators";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();

    const validatedData = LoginPayloadValidatorSchema.parse(data);

    const user = await prisma.user.findUnique({
      where: { identifier: validatedData.identifier },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials", message: "error", success: false },
        { status: 401 },
      );
    }

    const isPasswordValid = await bcrypt.compare(
      validatedData.password,
      user.password,
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials", message: "error", success: false },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { data: data, message: "login success", success: true },
      { status: 200 },
    );
  } catch (error) {
    console.log("error while loging-in ********* ", error);
    if (error instanceof z.ZodError) {
      const errors = await JSON.parse(error.message)?.map((e) => e.message);

      return NextResponse.json(
        { error: errors, message: "error", success: false },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error", message: "error", success: false },
      { status: 500 },
    );
  }
};
