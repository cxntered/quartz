import { NextResponse, type NextRequest } from "next/server";
import { customAlphabet } from "nanoid/non-secure";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import prisma from "@/prisma/db";

const ratelimit = new Ratelimit({
	redis: Redis.fromEnv(),
	limiter: Ratelimit.slidingWindow(1, "60 s")
});

const generateRandomName = async (): Promise<string> => {
	const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	const nanoid = customAlphabet(alphabet, 5);

	const proposal = nanoid();

	const query = await prisma.link.findUnique({ where: { id: proposal } });

	if (query) {
		return generateRandomName();
	} else {
		return proposal;
	}
};

export async function POST(request: NextRequest) {
	const req = await request.json();

	const ip = req.ip ?? "127.0.0.1";
	const { success, pending, limit, reset, remaining } = await ratelimit.limit(ip);
	if (!success) {
		return NextResponse.json(
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
	}

	if (process.env.SECRET && req.secret !== process.env.SECRET) {
		return NextResponse.json({ message: "Invalid secret!", ok: false }, { status: 401 });
	}

	const query = await prisma.link.findUnique({ where: { id: req.id } });

	try {
		if (query == null) {
			const id: string = req.id || (await generateRandomName());
			const url: string = req.link;

			await prisma.link.create({ data: { url, id } });

			return NextResponse.json({ url, id, ok: true }, { status: 200 });
		} else {
			return NextResponse.json(
				{ message: "A link with that ID already exists!", ok: false },
				{ status: 409 }
			);
		}
	} catch (err) {
		console.error(err);

		return NextResponse.json(
			{ message: "An unknown error occurred!", ok: false },
			{ status: 500 }
		);
	}
}
