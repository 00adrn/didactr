import { GoogleGenAI } from '@google/genai';
import { PRIVATE_GEMINI_API_KEY } from '$env/static/private';


const gemini = new GoogleGenAI({apiKey: PRIVATE_GEMINI_API_KEY});

const main = async () => {
    const response = await gemini.models.generateContent({
        model: "gemini-3-flash-preview",
        contents:"Explain how AI works in a few words."
    });
    console.log(response.text);
};

const cleanResponse = async (response: string|undefined) => {
    if (!response) return "ERROR: NO RESPONSE"

    const data = JSON.parse(response);
    return data;
};

const queryWords = async (language: string, word: string) => {
    const response = await gemini.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate nothing but a json of all ${language} translations of the 
                    word \"${word}\" in the format: { translations: {word1, word2, ..}} exclude newline characters.`
    });

    const data = cleanResponse(response.text);

    console.log(data);
    return data;
};

const geminiApi = { main, queryWords };
export { geminiApi };