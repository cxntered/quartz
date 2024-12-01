import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/sonner";
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
				<script dangerouslySetInnerHTML={{
					__html: kawaii
				}} />
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<ThemeToggle />
					{children}
					<Toaster richColors />
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}

// code from reactjs/reactjs.dev >w<
// https://github.com/reactjs/react.dev/blob/4eacc736ef9ebef87a2b453a7d4fbd490e720741/src/pages/_document.tsx#L43-L99
const kawaii = `
	(function () {
		try {
			function setKawaii(isKawaii) {
				try {
					if (isKawaii) {
						localStorage.setItem('kawaii', "true");
						document.documentElement.classList.add('kawaii');
					} else {
						localStorage.removeItem('kawaii');
						document.documentElement.classList.remove('kawaii');
					}
				} catch (err) { }
			};
			window.__setKawaii = setKawaii;
			function checkQueryParam() {
				const params = new URLSearchParams(window.location.search);
				const value = params.get('kawaii');
				switch (value) {
					case '':
					case 'true':
					case '1':
						return true;
					case 'false':
					case '0':
						return false;
					default:
						return null;
				}
			}
			function checkLocalStorage() {
				try {
					return localStorage.getItem('kawaii') === 'true';
				} catch (err) {
					return false;
				}
			}
			const kawaiiQueryParam = checkQueryParam();
			if (kawaiiQueryParam != null) {
				setKawaii(kawaiiQueryParam);
			} else if (checkLocalStorage()) {
				document.documentElement.classList.add('kawaii');
			}
		} catch (err) { }
	})();`;
