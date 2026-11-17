import { NextResponse } from "next/server";
import { adminUpdateStockStatus } from "@/lib/plants";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, stockStatus } = body;

    if (!id || !stockStatus) {
      return NextResponse.json({ error: "Plant ID and stock status are required" }, { status: 400 });
    }

    const validStatuses = ["in_stock", "ask", "seasonal", "out"];
    if (!validStatuses.includes(stockStatus)) {
      return NextResponse.json(
        { error: `Invalid stockStatus. Must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    const updated = await adminUpdateStockStatus(Number(id), stockStatus);
    return NextResponse.json({ success: true, plant: updated });
  } catch (err: any) {
    if (err.name === "AuthError") {
      return NextResponse.json({ error: err.message, code: err.code }, { status: err.status });
    }
    console.error("Stock update error:", err);
    return NextResponse.json({ error: err.message || "Failed to update stock status" }, { status: 500 });
  }
}
