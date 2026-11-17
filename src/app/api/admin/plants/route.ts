import { NextResponse } from "next/server";
import { adminGetAllPlants } from "@/lib/plants";

export async function GET() {
  try {
    const plants = await adminGetAllPlants();
    return NextResponse.json({ success: true, plants });
  } catch (err: any) {
    if (err.name === "AuthError") {
      return NextResponse.json({ error: err.message, code: err.code }, { status: err.status });
    }
    console.error("Admin plants API error:", err);
    return NextResponse.json({ error: "Failed to fetch plants" }, { status: 500 });
  }
}
