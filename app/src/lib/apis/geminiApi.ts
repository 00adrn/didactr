import { GoogleGenAI } from '@google/genai';
import { PRIVATE_GEMINI_API_KEY } from '$env/static/private';


const geminiClient = new GoogleGenAI({apiKey: PRIVATE_GEMINI_API_KEY});

const main = async () => {
    const response = await geminiClient.models.generateContent({
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

const queryWords = async (language: string, words: string[]) => {
    let contentString = `Generate nothing but a json of all english translations of the ${language} words `;
    for (let word of words) {
        contentString += '"' + word + '" ';
    }
    contentString += "in the format: [{word: word1, translations: [translation1, translation2...]}, { word: word2, translations: ...} ] exclude newline characters and make everything lowercase."
    const response = await geminiClient.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: contentString
    });

    const data = cleanResponse(response.text);

    console.log(data);
    return data;
};

const gemini = { main, queryWords };
export { gemini };