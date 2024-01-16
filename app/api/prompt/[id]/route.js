import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const post = await Prompt.findById(params.id).populate('creator');

        if (!post)
            return new Response('Prompt not found', { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response('Failed to fetch the Prompt', { status: 500 });
    }
}


export const PATCH = async (request, { params }) => {
    const { updatedPrompt, updatedTag } = await request.json();
        
    try {
        await connectToDB();

        const post = await Prompt.findById(params.id);

        if (!post)
            return new Response('Prompt not found', { status: 404 });

        post.prompt = updatedPrompt;
        post.tag = updatedTag;

        await post.save();

        return new Response("Successfully updated the Prompt", { status: 200 });

    } catch (error) {
        return new Response('Failed to update the Prompt', { status: 500 });
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndDelete(params.id);

        return new Response('Prompt deleted successfully', { status: 200 });
    } catch (error) {
        return new Response('Failed to delete the Prompt', { status: 500 });
    }
}