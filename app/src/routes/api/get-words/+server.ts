import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { geminiApi } from "$lib/gemapi";

export const GET: RequestHandler = async ({}) => {
    const words = await geminiApi.queryWords("spanish", "computer");
    console.log(words);

    return json(words);
};