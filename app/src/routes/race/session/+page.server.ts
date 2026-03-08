import type { ServerLoad } from "@sveltejs/kit"
import { generateRandomWords, getMockData } from "$lib/utils"
import { supabase } from "$lib/supabase"

export const load: ServerLoad = async ({ url, fetch }) => {
        const room =  url.searchParams.get("room");

        let { data, error: roomDataError } = await supabase.from("rooms").select("word_data").eq("id", room).single();

        if (roomDataError || !data) {
        const lang = url.searchParams.get("lang");
        const count = url.searchParams.get("count");


        console.log("Initializing practice with lang=" + lang + " and count=" + count);
        
        const wordsToTranslate = generateRandomWords(Number(count), lang!);
        // const wordsToTranslate = getMockData();

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
        await supabase.from("rooms").insert({ id: room, word_data: respData })

        console.log(respData);

        return {translationData: respData, room};
    }

    return { translationData: data.word_data, room}
}