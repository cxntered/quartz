import { NextResponse, type NextRequest } from "next/server";
import { customAlphabet } from "nanoid/non-secure";
import prisma from "@/prisma/db";

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
