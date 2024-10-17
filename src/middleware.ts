import { NextRequest, NextResponse } from "next/server";

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico).*)"
	]
};

export async function middleware(req: NextRequest) {
	if (req.nextUrl.pathname === "/") return;

	const res = await fetch(
		`${req.nextUrl.origin}/api/get?url=${req.nextUrl.pathname.split("/")[1]}`
	);

	if (res.status === 404) return;

	const query = await res.json();
	const url = new URL(query.url);

	return NextResponse.redirect(url);
}
