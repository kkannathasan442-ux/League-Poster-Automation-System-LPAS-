import { NextResponse } from "next/server";
import { db } from "@/db";
import { players } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { name, role, phone, photo } = await request.json();

    // Validation
    if (!name || !role || !phone || !photo) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }

    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { message: "Phone must be exactly 10 digits" },
        { status: 400 }
      );
    }

    // Auto Player No
    const allPlayers = await db.select().from(players);
    const playerNo = String(allPlayers.length + 1).padStart(2, "0");

    // Save to DB
    const newPlayer = await db
      .insert(players)
      .values({
        playerNo,
        name,
        role,
        phone,
        photo,
      })
      .returning();

    return NextResponse.json(
      {
        message: "Player created successfully",
        player: newPlayer[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating player:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const allPlayers = await db.select().from(players);
    return NextResponse.json(allPlayers);
  } catch (error) {
    console.error("Error fetching players:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}