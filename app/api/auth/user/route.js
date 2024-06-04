import { getUserByEmail } from "@/database/queries";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  return new Response.json(JSON.stringify({ message: "ok" }, { status: 200 }));
}

export async function POST(request) {
  const data = await request.json();
  try {
    const user = await getUserByEmail(data?.email);
    return NextResponse.json({ user: user, status: 200 }, { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err?.message, status: 404 }, { status: 404 })
    );
  }
}
