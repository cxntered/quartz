import { Github } from "lucide-react";
import { KawaiiToggle } from './kawaii-toggle';
import Link from "next/link";

export function Footer() {
	return (
		<footer className="fixed inset-x-0 bottom-0 p-4 text-center">
			<p className="text-sm text-zinc-500 dark:text-zinc-400">
				Made by{" "}
				<span>
					<Link href="https://cxntered.dev" className="underline underline-offset-4">
						cxntered
					</Link>
				</span>
				. Source code is available on{" "}
				<span className="inline-block align-top">
					<Link
						href="https://github.com/cxntered/quartz"
						className="underline underline-offset-4 flex items-center"
					>
						<Github className="h-4 w-4 mr-0.5" /> GitHub
					</Link>
				</span>
				<KawaiiToggle />
			</p>
		</footer>
	);
}
