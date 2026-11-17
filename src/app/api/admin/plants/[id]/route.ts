import { NextResponse } from "next/server";
import { adminGetPlantById, adminUpdatePlant } from "@/lib/plants";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const plant = await adminGetPlantById(Number(id));
    if (!plant) {
      return NextResponse.json({ error: "Plant not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, plant });
  } catch (err: any) {
    if (err.name === "AuthError") {
      return NextResponse.json({ error: err.message, code: err.code }, { status: err.status });
    }
    return NextResponse.json({ error: "Failed to fetch plant" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await adminUpdatePlant(Number(id), body);
    return NextResponse.json({ success: true, plant: updated });
  } catch (err: any) {
    if (err.name === "AuthError") {
      return NextResponse.json({ error: err.message, code: err.code }, { status: err.status });
    }
    console.error("Plant update error:", err);
    return NextResponse.json({ error: err.message || "Failed to update plant" }, { status: 500 });
  }
}
