import { NextResponse } from "next/server";
import { fetchProviders } from "@/lib/junction";

export async function GET() {
  try {
    const providers = await fetchProviders();
    return NextResponse.json(providers);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
