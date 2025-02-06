import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  return NextResponse.json({ result: "hello" });
}
