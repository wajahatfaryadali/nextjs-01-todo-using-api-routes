import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const data = req.body;
    

    NextResponse.json(
      { data: data, message: "login success", success: true },
      { status: 200 },
    );
  } catch (error) {
    console.log("error while loging-in ********* ", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "error", success: false },
      { status: 500 },
    );
  }
};
