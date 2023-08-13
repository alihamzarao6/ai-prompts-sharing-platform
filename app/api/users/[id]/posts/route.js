import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// Get all the prompts created by a same user. we'll be using user's id to fetch all his created posts.
export const GET = async (req, {params}) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({creator: params.id}).populate("creator");

        return new Response(JSON.stringify(prompts), {status: 200});
    } catch (error) {
        return new Response("Failed to fetch prompts created by the user", {status: 500});
    }
}