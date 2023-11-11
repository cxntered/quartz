import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Not Found"
}

export default function NotFound() {
	return (
		<main className="relative">
			<div className="flex flex-col items-center justify-center h-screen">
				<div className="flex items-center mb-4">
					<h1 className="text-2xl font-semibold tracking-tight mr-4 pr-4 border-r border-zinc-200 dark:border-zinc-800">404</h1>
					<p className="text-l">That link could not be found.</p>
				</div>
				<div>
					<Button asChild>
						<Link href="/">Go home</Link>
					</Button>
				</div>
			</div>
		</main>
	);
}