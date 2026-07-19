import { NextRequest, NextResponse } from "next/server";
import { fetchSleep } from "@/lib/junction";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const userId = searchParams.get("user_id");
  const date = searchParams.get("date") ?? undefined;

  if (!userId) {
    return NextResponse.json(
      { error: "Missing required query parameter: user_id" },
      { status: 400 }
    );
  }

  try {
    const data = await fetchSleep(userId, date);
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
