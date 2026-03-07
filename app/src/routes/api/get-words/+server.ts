import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { gemini } from "$lib/geminiApi";
import { mongo } from "$lib/mongoApi" ;

export const GET: RequestHandler = async ({ request }) => {

    const existingData = await mongo.searchForTranslationData("spanish", "domingo");
    var translations;
    
    if (existingData === -1) {
        translations = await gemini.queryWords("spanish", "domingo");
        await mongo.insertTranslationData("spanish", "domingo", translations);
    } else {
        translations = existingData;
    }

    return json(translations);
};