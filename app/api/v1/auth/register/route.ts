import prisma from "@/db/prisma";
import { isUserExistByIdentifier } from "@/lib/api/services/api-query-helper";
import { RegisterPayloadValidatorSchema } from "@/lib/zod-validators";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import z from "zod";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();

    const validatedData = RegisterPayloadValidatorSchema.parse(data);

    if (await isUserExistByIdentifier(validatedData.identifier)) {
      return NextResponse.json(
        {
          error: "user already exist with same email id",
          message: "email already used",
          success: false,
          data: { email: validatedData.identifier },
        },
        { status: 409 },
      );
    }

    const encryptedPassword = bcrypt.hashSync(validatedData.password, 10);

    const user = await prisma.user.create({
      data: {
        identifier: validatedData.identifier,
        password: encryptedPassword,
        isActive: true,
        name: "n/a",
      },
      omit: {
        password: true,
      },
    });

    return NextResponse.json(
      {
        message: "user created successfully!",
        success: true,
        data: user,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("error while registering user ********** ", error);

    if (error instanceof z.ZodError) {
      const errors = JSON.parse(error.message)?.map((e) => e.message);
      return NextResponse.json(
        {
          error: errors,
          success: false,
          message: "invalid payload",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: "Internal Server Error",
        success: false,
        message: "error",
      },
      { status: 500 },
    );
  }
};
