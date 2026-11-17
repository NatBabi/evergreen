import { NextResponse } from "next/server";
import { getLivePlants } from "@/lib/plants";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") === "am" ? "am" : "en";
    const plants = await getLivePlants(lang);
    return NextResponse.json({ success: true, plants });
  } catch (err: any) {
    console.error("Public plants API error:", err);
    return NextResponse.json({ error: "Failed to fetch plants" }, { status: 500 });
  }
}
