import connectToMongo from "@/database/connectToMongo";
import courses from "@/models/courses";
import season from "@/models/seasons";
import episodes from "@/models/episodes";
import {checkUserNavbar} from "@/functions";
import seasons from "@/models/seasons";

export const GET = async (req, context) => {
    const {params} = context
    const {id: courseId} = params

    connectToMongo()

    const courseResult = await courses.findOne({_id: courseId})
        .populate({
            path: "parts", // فصل‌ها
            model: "Seasons",
            populate: {
                path: "episodes",
                model: "Episodes"
            }
        });

    if (!courseResult) {
        return Response.json("دوره ای یافت نشد", {status: 404});
    }

    return Response.json(courseResult, {status: 200});
}

export const DELETE = async (req, context) => {
    const {params} = context
    const {id} = params

    const userRequested = await checkUserNavbar()

    if (userRequested?.role === 'User' || !userRequested || userRequested?.isBlock) {
        return Response.json("شما اجازه دسترسی به این API را ندارید", {status: 412})
    }

    const removeResponse = await courses.findOneAndDelete({_id: id})

    if (!removeResponse) {
        return Response.json("دوره حذف نشد", {status: 404})
    }

    return Response.json("دوره حذف شد", {status: 200})
}

export const PUT = async (req, context) => {
    const {params} = context
    const {id} = params
    const courseObject = await req.json()

    const userRequested = await checkUserNavbar()

    if (userRequested?.role === 'User' || !userRequested || userRequested?.isBlock) {
        return Response.json("شما اجازه دسترسی به این API را ندارید", {status: 412})
    }

    // فرض courseObject.parts شامل فصل‌های کامل به همراه اپیزودها است
    for (const season of courseObject.parts) {
        await seasons.findByIdAndUpdate(season._id, {
            number: season.number,
            title: season.title,
            // اگر لازم بود موارد دیگه هم آپدیت بشه
        });

        for (const episode of season.episodes) {
            await episodes.findByIdAndUpdate(episode._id, {
                number: episode.number,
                title: episode.title,
                video: episode.video,
                file: episode.file,
                // ...
            });
        }
    }

    return Response.json("دوره آپدیت شد", {status: 200})
}