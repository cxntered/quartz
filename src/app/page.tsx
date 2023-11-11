"use client";

import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";

export default function Home() {
	const formSchema = z.object({
		link: z.string().url({ message: "Please enter a valid URL" }),
		id: z.string().optional()
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values)
	}

	return (
		<main className="relative">
			<div className="flex items-center justify-center h-screen">
				<Card className="w-[32rem] m-12">
					<CardHeader>
						<CardTitle>Quartz</CardTitle>
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
												<Input placeholder="https://q.cxntered.dev" autoComplete="off" {...field} />
											</FormControl>
											<FormDescription>
												The link to shorten
											</FormDescription>
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
												<Input placeholder="quartz" autoComplete="off" {...field} />
											</FormControl>
											<FormDescription>
												The ID for the shortened link
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
