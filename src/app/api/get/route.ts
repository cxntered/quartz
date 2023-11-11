import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/prisma/db";

export async function GET(request: NextRequest) {
	const url = request.nextUrl.searchParams.get("url");
	const query = await prisma.link.findUnique({ where: { id: url as string } });

	if (query === null) {
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	} else {
		return NextResponse.json({ url: query.url }, { status: 200 });
	}
}
