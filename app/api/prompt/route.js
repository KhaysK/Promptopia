import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
    try {
        await connectToDB();
        const prompts = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(prompts), {
            status: 200, headers: {
                'Cache-Control': 'no-store',
            },
        });
    } catch (error) {
        return new Response(`Failed to fetch all prompts: ${error}`, { status: 500 });
    }
}   