"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import Image from "next/image";
import quartzLogo from "public/assets/Quartz.webp";
import { useState } from "react";
import { Check, Copy, Loader2 } from "lucide-react";

export default function Home() {
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [link, setLink] = useState("");
	const [copied, setCopied] = useState(false);

	const formSchema = z.object({
		link: z.string().url({ message: "Enter a valid URL" }),
		id: z.string().toLowerCase().trim().regex(/^[a-zA-Z0-9]*$/, { message: "Enter an alphanumeric ID" }).optional(),
		...(process.env.SECRET ? { secret: z.string().min(1, { message: "Secret is required" }) } : {})
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			link: "",
			id: "",
			...(process.env.SECRET ? { secret: "" } : {})
		}
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setLoading(true);
		const res = await fetch("api/create", {
			method: "POST",
			body: JSON.stringify(values),
			headers: {
				"Content-Type": "application/json"
			}
		}).then((res) => res.json());
		setLoading(false);

		if (res.ok) {
			setLink(`${window.location.origin}/${res.id}`);
			setOpen(true);
		} else {
			toast.error("Something went wrong!", {
				description: res.message ?? "An unknown error occurred!"
			})
		}
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(link);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<main className="relative">
			<div className="flex items-center justify-center h-screen">
				<div className="w-[32rem] m-4">
					<div className="flex flex-col space-y-1.5 p-6 items-center">
						<h3 className="text-2xl font-semibold leading-none tracking-tight flex flex-row items-center">
							<Image
								className="[image-rendering:pixelated;] mr-1"
								src={quartzLogo}
								alt="Quartz Logo"
								width="32"
								height="32"
								unoptimized
								priority={true}
							/>
							Quartz
						</h3>
						<p className="text-sm text-zinc-500 dark:text-zinc-400">A link shortener for the modern web</p>
					</div>
					<div className="p-6 pt-0">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
								<FormField
									control={form.control}
									name="link"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Link</FormLabel>
											<FormControl>
												<Input
													placeholder="https://q.cxntered.dev"
													autoComplete="off"
													{...field}
												/>
											</FormControl>
											<FormDescription>The link to shorten</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="id"
									render={({ field }) => (
										<FormItem>
											<FormLabel>ID</FormLabel>
											<FormControl>
												<Input
													placeholder="quartz"
													autoComplete="off"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												The ID for the shortened link (optional)
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								{process.env.SECRET && (
									<FormField
										control={form.control}
										name="secret"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Secret</FormLabel>
												<FormControl>
													<Input
														placeholder="secret"
														autoComplete="off"
														{...field}
														value={field.value as string}
														type="password"
													/>
												</FormControl>
												<FormDescription>
													The secret to shorten the link
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}
								{loading ? (
									<Button disabled type="submit">
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Shortening...
									</Button>
								) : (
									<Button type="submit">Shorten</Button>
								)}
								<Dialog open={open} onOpenChange={setOpen}>
									<DialogContent className="w-11/12 sm:max-w-lg">
										<DialogHeader>
											<DialogTitle>Shortened link</DialogTitle>
											<DialogDescription>
												Success! Your link has been shortened.
											</DialogDescription>
										</DialogHeader>
										<div className="flex items-center space-x-2">
											<div className="grid flex-1 gap-2">
												<Label htmlFor="link" className="sr-only">
													Link
												</Label>
												<Input
													id="link"
													defaultValue={link}
													readOnly
												/>
											</div>
											<Button onClick={handleCopy} type="submit" size="sm" className="px-3">
												<span className="sr-only">Copy</span>
												{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
											</Button>
										</div>
									</DialogContent>
								</Dialog>
							</form>
						</Form>
					</div>
				</div>
			</div>
		</main>
	);
}
