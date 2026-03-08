import type { ServerLoad } from "@sveltejs/kit"
import { generateRandomWords } from "$lib/utils"

export const load: ServerLoad = async ({ url, fetch }) => {
    const lang = url.searchParams.get("lang");
    const count = url.searchParams.get("count");

    console.log("Initializing practice with lang=" + lang + " and count=" + count);
    
    const wordsToTranslate = generateRandomWords(Number(count), lang!);

    const resp = await fetch("/api/get-words", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            words: wordsToTranslate,
            language: lang,
        }),
    });

    const respData = await resp.json();
    console.log(respData)
    const data = {translationData: respData };
    return data;
}