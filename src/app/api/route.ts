import fetch from "cross-fetch";

export async function GET(request: Request) {
    request;
    const res = await fetch("https://openexchangerates.org/api/latest.json");
    const data = await res.json();

    return Response.json({ data });
}
