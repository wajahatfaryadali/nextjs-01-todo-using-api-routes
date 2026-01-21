import prisma from "@/db/prisma";
import { errorRes, successRes } from "@/lib/helpers/api-helpers";
import {
  UserPostValidatorSchema,
  UsersValidatorSchema,
} from "@/lib/zod-validators";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

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

// "duck error"
export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();

    const validaedData = UserPostValidatorSchema.parse(data);

    // console.log("chekcing data ********* ", validaedData);
    return NextResponse.json(
      successRes({ data: data, message: "data sending in post" }),
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("zod errorr **********", z.flattenError(error));
      console.log("zod errorr **********", z.formatError(error));
      console.log("zod errorr **********", z.prettifyError(error));
      console.log("zod errorr **********", z.treeifyError(error));
      
      return NextResponse.json(
        errorRes({
          code: 500,
          error: error,
          message: "error in validation",
        }),
      );
    }

    return NextResponse.json(
      errorRes({
        code: 500,
        error: error,
      }),
    );
  }
};
