import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  try {
    const { data, error } = await supabase.from("pois").select("*");

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch POIs" },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ message: "No POIs found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
