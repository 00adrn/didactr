import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { gemini } from "$lib/apis/geminiApi";
import { mongo } from "$lib/apis/mongoApi" ;

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();
    
    let words = data.words;
    const language = data.language;
    let translations = [];
    let untranslated = [];

    for (const word of words) {
        const existingData = await mongo.searchForTranslationData(language, word);
        if (existingData !== -1) {
            translations.push({ word: word, translations: existingData });
        } else
            untranslated.push(word);
    }
    
    if (untranslated.length != 0) { 
        const resp = await gemini.queryWords(language, untranslated);
        for (let word of resp) {
            translations.push({ word: word.word, translations: word.translations});
            mongo.insertTranslationData(language, word.word, word.translations);
        }
    }
    
    return json(translations);
};