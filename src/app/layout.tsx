import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./styles/globals.css";

export const fontSans = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Quartz",
	description: "A link shortener for the modern web",
	openGraph: {
		title: "Quartz",
		description: "A link shortener for the modern web",
		url: "https://cxntered.dev/",
		siteName: "q.cxntered.dev",
		images: [
			{
				url: "https://cxntered.me/assets/Quartz.png"
			}
		],
		locale: "en_US",
		type: "website"
	}
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={cn(
				"min-h-screen bg-background font-sans antialiased",
				fontSans.className
			)}>
				{children}
			</body>
		</html>
	);
}
