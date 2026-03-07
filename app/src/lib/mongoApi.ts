import { MongoClient, ServerApiVersion } from "mongodb";
import { PRIVATE_MONGO_URI } from "$env/static/private";

const uri = PRIVATE_MONGO_URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


const insertTranslationData = async (lang: string, word: string, translations: string[]) => {
    await client.connect();
    const db = client.db("didactr").collection(lang);

    const data = { word: word, translations};
    const result = await db.insertOne(data);

    console.log(`Successfully inserted translation data for "${word}" in ${lang}`);
    return 1;
};

const searchForTranslationData = async (lang: string, word: string) => {
    await client.connect();
    const db = client.db("didactr").collection(lang);


    const query = { word: word}
    const findResult = await db.findOne(query);

    if (!findResult) {
        console.log("No translation data found.")
        return -1;
    }

    console.log(`Successfully found translation data for "${word}" in ${lang}.`)

    return findResult.translations;
};

const mongo = {searchForTranslationData, insertTranslationData };

export { mongo }