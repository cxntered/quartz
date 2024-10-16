import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
	redis: Redis.fromEnv(),
	limiter: Ratelimit.slidingWindow(10, "60 s")
});

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!_next/static|_next/image|favicon.ico).*)"
	]
};

export async function middleware(req: NextRequest) {
	if (req.nextUrl.pathname === "/") return;

	if (req.nextUrl.pathname.startsWith("/api")) {
		if (req.nextUrl.pathname !== "/api/create") return;

		const ip = req.ip ?? "127.0.0.1";
		const { success, pending, limit, reset, remaining } = await ratelimit.limit(ip);

		return success
			? NextResponse.next()
			: NextResponse.json(
					{
						message: "Rate limit exceeded! Try again in a few minutes.",
						ok: false,
						limit,
						remaining,
						reset,
						pending
					},
					{ status: 429 }
			  );
	} else {
		const res = await fetch(
			`${req.nextUrl.origin}/api/get?url=${req.nextUrl.pathname.split("/")[1]}`
		);

		if (res.status === 404) return;

		const query = await res.json();
		const url = new URL(query.url);

		return NextResponse.redirect(url);
	}
}
