"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import copy from "copy-to-clipboard";
import Image from "next/image";
import quartzLogo from "public/assets/Quartz.webp";

export default function Home() {
	const formSchema = z.object({
		link: z.string().url({ message: "Enter a valid URL" }),
		id: z.string().toLowerCase().trim().regex(/^[a-zA-Z0-9]*$/, { message: "Enter an alphanumeric ID" }).optional()
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			link: "",
			id: ""
		}
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const res = await fetch("api/create", {
			method: "POST",
			body: JSON.stringify(values),
			headers: {
				"Content-Type": "application/json"
			}
		}).then((res) => res.json());

		if (res.ok) {
			toast.success("Success!", {
				description: "Your link has been shortened.",
				action: {
					label: "Copy link",
					onClick: () => copy(`${window.location.origin}/${res.id}`)
				},
				duration: Infinity
			});
		} else {
			toast.error("Something went wrong!", {
				description: res.message ?? "An unknown error occurred!"
			})
		}
	};

	return (
		<main className="relative">
			<div className="flex items-center justify-center h-screen">
				<Card className="w-[32rem] m-12">
					<CardHeader>
						<CardTitle className="flex flex-row items-center">
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
						</CardTitle>
						<CardDescription>A link shortener for the modern web</CardDescription>
					</CardHeader>
					<CardContent>
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
								<Button type="submit">Shorten</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
