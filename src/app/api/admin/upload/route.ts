import { NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/auth";
import { put } from "@vercel/blob";
import fs from "fs";
import path from "path";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(request: Request) {
  try {
    // 1. Strict Server-Side Authorization Check
    await requireAdminAuth();

    // 2. Parse Multipart Form Data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    // 3. Validate MIME Type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type "${file.type}". Only JPEG, PNG, WebP, and AVIF are permitted.` },
        { status: 400 }
      );
    }

    // 4. Validate File Size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: `File size exceeds the 5MB limit (${(file.size / (1024 * 1024)).toFixed(2)} MB uploaded).` },
        { status: 400 }
      );
    }

    // 5. Generate Safe Filename
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const safeFilename = `plant-${timestamp}-${randomSuffix}.${extension}`;

    // 6. Upload via Vercel Blob if token is configured
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(`plants/${safeFilename}`, file, {
          access: "public",
        });
        return NextResponse.json({
          success: true,
          url: blob.url,
          filename: safeFilename,
          size: file.size,
          mimeType: file.type,
        });
      } catch (blobErr: any) {
        console.error("Vercel Blob upload failed:", blobErr);
        return NextResponse.json({ error: "Cloud storage upload failed: " + blobErr.message }, { status: 500 });
      }
    }

    // Local Development Fallback: Save to public/uploads
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const localFilePath = path.join(uploadsDir, safeFilename);
    fs.writeFileSync(localFilePath, buffer);

    const publicUrl = `/uploads/${safeFilename}`;
    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: safeFilename,
      size: file.size,
      mimeType: file.type,
    });
  } catch (err: any) {
    if (err.name === "AuthError") {
      return NextResponse.json({ error: err.message, code: err.code }, { status: err.status });
    }
    console.error("Image upload route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
