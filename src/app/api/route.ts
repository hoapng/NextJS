import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  console.log("request.url", request.url);
  const url = new URL(request.url);
  console.log(">>> check url:", url);
  const searchParams = new URLSearchParams(url.search);
  const fileName = searchParams.get("audio");
  //   const fileName = url.searchParams.get("audio");
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${fileName}`
  );
}
