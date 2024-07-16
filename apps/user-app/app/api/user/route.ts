import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    return NextResponse.json({
      user: session.user,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "You are not logged in",
      },
      { status: 403 }
    );
  }
}
