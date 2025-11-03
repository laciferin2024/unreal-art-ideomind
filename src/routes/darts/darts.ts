// Note: Bun's $ is imported dynamically inside installDarts to avoid bundling/runtime issues on Node-only environments

// Extract the location URL from the output
export function extractLocationURL(output: string): string | null {
	const regex = /open\s+(.*)\s+cat\s+.*\s/;
	const match = output.match(regex);
	return match ? match[1] : null;
}

type BunDollar = (strings: TemplateStringsArray, ...values: unknown[]) => Promise<unknown>;

export async function installDarts() {
	// Dynamically load Bun's `$` so this module remains buildable/run-able on Node (e.g. Vercel)
	let $: BunDollar;
	try {
		({ $ } = await (Function("return import('bun')")() as Promise<{ $: BunDollar }>));
	} catch {
		console.warn("Bun runtime not detected. installDarts requires Bun.");
		throw new Error("Bun runtime not detected; cannot run installDarts");
	}
	try {
		// Check if 'darts' binary exists
		await $`command -v darts`;
		console.log("Darts binary already installed.");
		return "Darts binary is already installed.";
	} catch {
		// If not found and not in dev mode, install it
		console.log("Installing darts binary...");
		await $`curl -sSL https://bit.ly/install-darts | DARTS_LOC=darts bash -s -- darts`;

		console.log("Darts installation successful.");
		return "Darts binary installed successfully.";
	}
}

import type { Post } from "@/types";

export interface JobSpec extends Post {
	module?: string;
	version?: string; //version
	inputs?: Record<string, string | number>;
	author: string;
}
