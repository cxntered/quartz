import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/footer";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		default: "Quartz",
		template: "Quartz | %s"
	},
	description: "A link shortener for the modern web",
	metadataBase: new URL("https://q.cxntered.dev"),
	openGraph: {
		title: "Quartz",
		description: "A link shortener for the modern web",
		url: "/",
		siteName: "q.cxntered.dev",
		images: [
			{
				url: "/assets/Quartz.png"
			}
		],
		locale: "en_US",
		type: "website"
	}
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={cn("bg-white dark:bg-zinc-950 antialiased", inter.className)}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<ThemeToggle />
					{children}
					<Toaster />
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
