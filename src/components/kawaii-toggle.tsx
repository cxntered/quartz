"use client";

import Link from 'next/link';

export function KawaiiToggle() {
	return (
		<Link
			className="kawaii-visible-block cursor-pointer underline underline-offset-4"
			onClick={() => (window as any).__setKawaii(false)}
			href="/"
		>
			Not feeling kawaii anymore? {"(◞‸◟；)"}
		</Link>
	)
}